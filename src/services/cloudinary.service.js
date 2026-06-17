import cloudinary from "../config/cloudinary.js";

const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadToCloudinary = async (filePath) => {
  // 🔥 ALWAYS ensure config before upload
  initCloudinary();

  return await cloudinary.uploader.upload(filePath, {
    folder: "resumes",
    resource_type: "auto",
  });
};