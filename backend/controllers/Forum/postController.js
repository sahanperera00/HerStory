import Post from "../../models/Forum/postModel.js";
import User from "../../models/users/userInfoModel.js";
//import Comment from "../../models/Forum/commentModel.js";

export const createPost = async (req, res) => {
  const { postedBy,title,description,tags} = req.body;
  const newPost = new Post({
    postedBy:req.user,
    title,
    description,
    // image,
    tags,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("postedBy","_id email ");
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "postedBy",
      "_id email"
    );
    res.send(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 export const likePost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};


 export const UnlikePost = async (req, res) => {
   Post.findByIdAndUpdate(
     req.body.postId,
     {
       $pull: { likes: req.user._id },
     },
     {
       new: true,
     }
   ).exec((err, result) => {
     if (err) {
       return res.status(422).json({ error: err });
     } else {
       res.json(result);
     }
   });
 };

// router.put("/comment", requireLogin, (req, res) => {
//   const comment = {
//     text: req.body.text,
//     postedBy: req.user._id,
//   };
//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $push: { comments: comment },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("comments.postedBy", "_id name")
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });























