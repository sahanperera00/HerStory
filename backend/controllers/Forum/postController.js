import Post from "../../models/Forum/postModel.js";
import User from "../../models/users/userInfoModel.js";
//import Comment from "../../models/Forum/commentModel.js";

export const createPost = async (req, res) => {
  const {
    postedBy,
    image,
    title,
    category,
    description,
    tags,
    dateCreated,
    content,
  } = req.body;
  const newPost = new Post({
    postedBy: req.user,
    title,
    description,
    category,
    image,
    tags,
    dateCreated,
    content,
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
    const posts = await Post.find().populate("postedBy", "_id email ");
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("postedBy", "_id email")
      .populate("comments.postedBy");
    res.send(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = req.body;
    const updateDoc = {
      $set: updatedPost,
    };
    const result = await Post.updateOne({ _id: req.params.id }, updateDoc, {
      upsert: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { likes: req.body.userId },
      },
      {
        new: true,
      }
    );
    res.json(response);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

export const UnlikePost = async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { likes: req.body.userId },
      },
      {
        new: true,
      }
    );
    res.json(response);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { dislikes: req.body.userId },
      },
      {
        new: true,
      }
    );
    res.json(response);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

export const undislikePost = async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { dislikes: req.body.userId },
      },
      {
        new: true,
      }
    );
    res.json(response);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

export const makeComment = async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: req.body.comment },
    }).populate("comments.postedBy");

    res.json(response);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

export const getDateRangePosts = async (req, res) => {
  try {
    const DS = req.params.DS;
    const DE = req.params.DE;
    const post = await Post.aggregate([
      {
        $match: { dateCreated: { $gte: new Date(DS), $lte: new Date(DE) } },
      },
    ]);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error });
  }
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

//get posts by category
export const getPostsbyCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category: category });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
