import express from "express";
import cors from "cors";

import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  updateCommunity,
  getCommunity,
} from "../../controllers/Forum/communityController.js";

const router = express.Router();

router.post("/", createCommunity);
router.get("/", getCommunities);
router.get("/:id", getCommunity);
router.put("/:id", updateCommunity);
router.delete("/:id", deleteCommunity);

export default router;
