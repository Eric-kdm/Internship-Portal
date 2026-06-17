import User from "../models/user.model.js";
import fs from "fs";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadToCloudinary(req.file.path);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resumeUrl: result.secure_url,
      },
      {
        new: true,
      }
    );

    if (req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl: result.secure_url,
      user,
    });

  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload resume",
    });
  }
};