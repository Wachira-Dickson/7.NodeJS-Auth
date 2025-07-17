const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const {uploadImageController, fetchImagesController} = require('../controllers/image-controller');

const router = express.Router()

//upload the image
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImageController, fetchImagesController);


//to get all the images
router.get("/get", fetchImagesController);

module.exports = router;