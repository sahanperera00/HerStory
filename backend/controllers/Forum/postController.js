import Post from "../../models/Forum/postModel.js";
import User from "../../models/users/userInfoModel.js";
//import Comment from "../../models/Forum/commentModel.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//Create a post
// export const createPost = async (req, res) => {
//   try {
//     const { title, description, content, tags } = req.body;

//     if (!title || !description || !content || !tags) {
//       return res
//         .status(400)
//         .json({ message: "Please enter all the required fields" });
//     }

//     //checks if the user already exists
//     let user = await User.findOne({ _id: req.user._id });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     //Creates new User
//     const post = new Post({
//       title,
//       description,
//       content,
//       tags,
//       postedBy: req.user._id,
//     });

//     await post.save();

//     //Checks if the user is created
//     if (post) {
//       res.status(201).json({ post: post });
//     } else {
//       res.status(400).json({ message: "Failed to create the post" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //Get all posts
// export const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({}).populate("postedBy", "name email");
//     res.send(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getPost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id).populate(
//       "postedBy",
//       "name email"
//     );
//     res.send(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updatePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (post) {
//       post.title = req.body.title || post.title;
//       post.description = req.body.description || post.description;
//       post.category = req.body.category || post.category;
//       post.tags = req.body.tags || post.tags;

//       const updatedPost = await post.save();
//       res.send(updatedPost);
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //Delete a post
// export const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (post) {
//       await post.remove();
//       res.json({ message: "Post removed" });
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // export const createComment = async (req, res) => {
// //   try {
// //     const { text } = req.body;

// //     if (!text) {
// //       return res
// //         .status(400)
// //         .json({ message: "Please enter all the required fields" });
// //     }

// //     //checks if the user already exists
// //     let user = await User.findOne({ _id: req.user._id });
// //     if (!user) {
// //       return res.status(400).json({ message: "User not found" });
// //     }

// //     //Creates new User
// //     const comment = new Comment({
// //       text,
// //       postedBy: req.user._id,
// //     });

// //     await comment.save();

// //     //Checks if the user is created
// //     if (comment) {
// //       res.status(201).json({ comment: comment });
// //     } else {
// //       res.status(400).json({ message: "Failed to create the comment" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // //Get all comments
// // export const getComments = async (req, res) => {
// //   try {
// //     const comments = await Comment.find({}).populate("postedBy", "name email");
// //     res.send(comments);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // export const getComment = async (req, res) => {
// //   try {
// //     const comment = await Comment.findById(req.params.id).populate(
// //       "postedBy",
// //       "name email"
// //     );
// //     res.send(comment);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // //Update a comment
// // export const updateComment = async (req, res) => {
// //   try {
// //     const comment = await Comment.findById(req.params.id);

// //     if (comment) {
// //       comment.text = req.body.text || comment.text;

// //       const updatedComment = await comment.save();
// //       res.send(updatedComment);
// //     } else {
// //       res.status(404).json({ message: "Comment not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // //Delete a comment
// // export const deleteComment = async (req, res) => {
// //   try {
// //     const comment = await Comment.findById(req.params.id);

// //     if (comment) {
// //       await comment.remove();
// //       res.json({ message: "Comment removed" });
// //     } else {
// //       res.status(404).json({ message: "Comment not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const likePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (post) {
//       if (
//         post.likes.find(
//           (like) => like.user.toString() === req.user._id.toString()
//         )
//       ) {
//         return res.status(400).json({ message: "Post already liked" });
//       }

//       post.likes.unshift({ user: req.user._id });

//       await post.save();
//       res.json({ message: "Post liked" });
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const unlikePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (post) {
//       if (
//         !post.likes.find(
//           (like) => like.user.toString() === req.user._id.toString()
//         )
//       ) {
//         return res.status(400).json({ message: "Post not liked" });
//       }

//       post.likes = post.likes.filter(
//         ({ user }) => user.toString() !== req.user._id.toString()
//       );

//       await post.save();
//       res.json({ message: "Post unliked" });
//     } else {
//       res.status(404).json({ message: "Post not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const likeComment = async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);

//     if (comment) {
//       if (
//         comment.likes.find(
//           (like) => like.user.toString() === req.user._id.toString()
//         )
//       ) {
//         return res.status(400).json({ message: "Comment already liked" });
//       }

//       comment.likes.unshift({ user: req.user._id });

//       await comment.save();
//       res.json({ message: "Comment liked" });
//     } else {
//       res.status(404).json({ message: "Comment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const unlikeComment = async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);

//     if (comment) {
//       if (
//         !comment.likes.find(
//           (like) => like.user.toString() === req.user._id.toString()
//         )
//       ) {
//         return res.status(400).json({ message: "Comment not liked" });
//       }

//       comment.likes = comment.likes.filter(
//         ({ user }) => user.toString() !== req.user._id.toString()
//       );

//       await comment.save();
//       res.json({ message: "Comment unliked" });
//     } else {
//       res.status(404).json({ message: "Comment not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
