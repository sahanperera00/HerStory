import express from "express";
import {
  getCounsellorInfo,
  createCounsellorInfo,
  updateCounsellorInfo,
  getNotApprovedCounsellorInfo,
  deleteCounsellorInfo,
  getCounsellorInfoById,
  getCounsellorInfoByUserId,
} from "../../controllers/users/counsellor.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.post("/", createCounsellorInfo);
router.get("/", getCounsellorInfo);
router.post("/:id", updateCounsellorInfo);
router.get("/notApproved", getNotApprovedCounsellorInfo);
router.delete("/:id", deleteCounsellorInfo);
router.get("/user/:id", getCounsellorInfoById);
router.get("/user/user/:id", getCounsellorInfoByUserId);

export default router;
