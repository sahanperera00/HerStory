import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // default:
    //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],

  dateCreated: {
    type: Date,
    required: true,
  },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
