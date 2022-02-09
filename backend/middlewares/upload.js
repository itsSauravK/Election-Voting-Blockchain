const multer = require('multer');
const cloudinaryStorage = require('../config/cloudinary.config');

const upload = multer({ storage: cloudinaryStorage });

module.exports = upload;