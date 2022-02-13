const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
   cloudinary,
   params: {
      folder: "candidates",
   },
});

module.exports = cloudinaryStorage;
