import express from "express";
import cors from "cors";

import { createCommunity, deleteCommunity, getCommunities, updateCommunity } from "../../controllers/Forum/communityController.js";

const router = express.Router();

router.post("/", createCommunity);
router.get("/view", getCommunities);
router.patch("/:id",updateCommunity);
router.delete("/:id",deleteCommunity);

export default router;
