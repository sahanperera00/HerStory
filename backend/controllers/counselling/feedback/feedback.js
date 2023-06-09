import Feedback from "../../../models/counselling/feedback/feedback.js";

export const createFeedback = async (req, res) => {
  const { client, counsellor, review, rating } = req.body;
  const newFeedback = new Feedback({
    client,
    counsellor,
    review,
    rating,
  });
  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate("client counsellor");
    res.status(200).json(feedback);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.findByIdAndRemove(id);
    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
