import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postedBy: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    ],
    tags: {
      type: String,
      required: true,
    },
    likes:{
      type: Number,
      default: 0,
    },
    dislikes:{
      type: Number,
      default: 0,
    },
    // comments: [
    //   {
    //     text: String,
    //     postedBy: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //   },
    // ],
    
    },
  
);

const Post = mongoose.model("Post", postSchema);
export default Post;
