const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    let mimeType;
    switch (file.mimetype) {
      case 'image/jpeg':
        mimeType = '.jpg';
        break;
      case 'image/png':
        mimeType = '.png';
        break;
      case 'image/gif':
        mimeType = '.gif';
        break;
      case 'image/bmp':
        mimeType = '.bmp';
        break;
      default:
        mimeType = '.jpg';
        break;
    }
    cb(null, file.fieldname + Date.now() + mimeType);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteImage = imagePath => {
  if (fs.existsSync(imagePath)) {
    try {
      fs.unlinkSync(imagePath);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = { uploadImage, deleteImage };
