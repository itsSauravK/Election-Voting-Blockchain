const multer = require("multer");
const cloudinaryStorage = require("../config/cloudinary");

const upload = multer({ storage: cloudinaryStorage });

module.exports = upload;
