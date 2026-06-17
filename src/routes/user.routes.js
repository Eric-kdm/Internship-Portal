import express from "express";
import { uploadResume } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

export default router;