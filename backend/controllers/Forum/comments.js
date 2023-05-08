import Comments from "../../models/Forum/commentsModel.js";


export const createComment = async (req, res) => {
  const comments = req.body;
  const newComments = new Comments(comments);
  try {
    await newComments.save();
    res.status(201).json(newComments);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


