import express from "express";
import cors from "cors";
import { authenticate } from "../../middleware/authentication.js";
import {
  getPosts,
  createPost,
  getPost,
  getDateRangePosts,
  updatePost,
  deletePost,
  likePost,
  UnlikePost,
  dislikePost,
  undislikePost,
  makeComment,
  getPostsbyCategory,
} from "../../controllers/Forum/postController.js";

const router = express.Router();

router.get("/", authenticate, getPosts);
router.get("/:id", authenticate, getPost);
router.get("/date/:DS/:DE", authenticate, getDateRangePosts);
router.get("/category/:category", authenticate, getPostsbyCategory);
router.post("/", authenticate, createPost);
router.put("/like/:postId", authenticate, likePost);
router.put("/unlike/:postId", authenticate, UnlikePost);
router.put("/dislike/:postId", authenticate, dislikePost);
router.put("/undislike/:postId", authenticate, undislikePost);
router.put("/comment/:postId", authenticate, makeComment);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;
