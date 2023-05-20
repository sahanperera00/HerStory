import mongoose from "mongoose";


const commentsSchema = mongoose.Schema({
  postID: {
    type: String,
    required: true,
  },

  commentedBy: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);
export default Comments;




