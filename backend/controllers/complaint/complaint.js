import Complaint from "../../models/complaint/complaint.js";

export const createComplaint = async (req, res) => {
  const {
    email,
    description,
    status,
    nic,
    firstname,
    lastname,
    phoneNumber,
    placeOfOccurance,
    files,
  } = req.body;

  const newComplaint = new Complaint({
    email,
    description,
    status,
    nic,
    firstname,
    lastname,
    phoneNumber,
    placeOfOccurance,
    files,
  });

  try {
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
