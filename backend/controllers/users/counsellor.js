import User from "../../models/users/userModel.js";
import CounsellorInfo from "../../models/users/counsellorModel.js"

export const createCounsellorInfo = async (req, res) => {
  const {
    user,
    dob,
    phoneNumber,
    gender,
    nationality,
    category,
    education,
    experience,
    certifications,
  } = req.body;
  try {
    if (!user) {
      return res.status(400).json({ message: "User is required" });
    }

    if (
      !dob ||
      !phoneNumber ||
      !gender ||
      !nationality ||
      !category 
      // !education ||
      // !experience ||
      // !certifications
    ) {
      return res
        .status(400)
        .json({ message: "Please enter all the required fields" });
    }

    const counsellorInfo = new CounsellorInfo({
      user,
      dob,
      phoneNumber,
      gender,
      nationality,
      category,
      education,
      experience,
      certifications,
    });

    await counsellorInfo.save();
    res.status(201).json({ counsellorInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCounsellorInfo = async (req, res) => {
  try {
    const counsellorInfo = await CounsellorInfo.find().populate("user");
    res.status(200).json({ counsellorInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const deleteCounsellorInfoandUserInfo = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await CounsellorInfo.findByIdAndRemove(id);
//     await User.findByIdAndRemove(id);
//     res.status(200).json({ message: "Counsellor deleted successfully." });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
