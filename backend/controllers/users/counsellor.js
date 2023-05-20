import User from "../../models/users/userModel.js";
import CounsellorInfo from "../../models/users/counsellorModel.js";

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

export const updateCounsellorInfo = async (req, res) => {
  const { id } = req.params;

  const oldCounsellorInfo = await CounsellorInfo.findById(id);

  if (req.body.dob) {
    oldCounsellorInfo.dob = req.body.dob;
  }
  if (req.body.phoneNumber) {
    oldCounsellorInfo.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.gender) {
    oldCounsellorInfo.gender = req.body.gender;
  }
  if (req.body.isApproved) {
    oldCounsellorInfo.isApproved = req.body.isApproved;
  }

  try {
    await oldCounsellorInfo.save();
    res.status(200).json(oldCounsellorInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getNotApprovedCounsellorInfo = async (req, res) => {
  try {
    const counsellorInfo = await CounsellorInfo.find({
      isApproved: false,
    }).populate("user");
    res.status(200).json({ counsellorInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCounsellorInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const counsellorInfo = await CounsellorInfo.findById(id).populate("user");
    await User.findByIdAndRemove(counsellorInfo.user._id);
    await CounsellorInfo.findByIdAndRemove(id);
    res.status(200).json({ message: "Counsellor Info deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCounsellorInfoById = async (req, res) => {
  const { id } = req.params;
  try {
    const counsellorInfo = await CounsellorInfo.findById(id).populate("user");
    res.status(200).json({ counsellorInfo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCounsellorInfoByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const counsellorInfo = await CounsellorInfo.findOne({ user: id }).populate(
      "user"
    );
    res.status(200).json({ counsellorInfo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
