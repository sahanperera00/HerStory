import express from "express";
import {
  getCounsellorInfo,
  createCounsellorInfo,
  updateCounsellorInfo,
  getNotApprovedCounsellorInfo,
  deleteCounsellorInfo,
  getCounsellorInfoById,
} from "../../controllers/users/counsellor.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.post("/", createCounsellorInfo);
router.get("/", getCounsellorInfo);
router.post("/:id", updateCounsellorInfo);
router.get("/notApproved", getNotApprovedCounsellorInfo);
router.delete("/:id", deleteCounsellorInfo);
router.get("/user/:id", getCounsellorInfoById);

export default router;
