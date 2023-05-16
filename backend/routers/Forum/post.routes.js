import express from "express";
import cors from "cors";
import { authenticate } from "../../middleware/authentication.js";
import {
   getPosts,
   createPost,
   getPost,
  // updatePost,
  // deletePost,
  // likePost,
} from "../../controllers/Forum/postController.js";

const router = express.Router();

router.get("/", authenticate, getPost);
router.get("/",authenticate,getPosts);
router.post("/",authenticate,createPost);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);
// router.patch("/:id/likePost", likePost);

export default router;
