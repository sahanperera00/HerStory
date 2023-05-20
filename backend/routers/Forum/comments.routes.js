import express from "express";
import cors from "cors";

//create comment route
import { createComment } from "../../controllers/Forum/comments.js";
const router = express.Router();

router.post("/", createComment);


export default router;

