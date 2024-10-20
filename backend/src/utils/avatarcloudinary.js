import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadAvatarImageOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      transformation: [
        { gravity: "face", height: 200, width: 200, crop: "thumb" },
        { quality: "auto" },
        { radius: "max" },
        { fetch_format: "auto" },
      ],
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Upload failed:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadAvatarImageOnCloudinary };
