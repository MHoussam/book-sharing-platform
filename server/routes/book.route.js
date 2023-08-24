const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const { upload } = require('../middlewares/multer.middleware'); // Import the upload middleware

router.post('/post', upload.single('image'), bookController.createPost);

module.exports = router;
