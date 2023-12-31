const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const { upload } = require('../middlewares/multer.middleware');

router.post('/post', upload.single('image'), bookController.createPost);
router.post('/all', bookController.getPosts);
router.post('/liked', bookController.getLikedPosts);
router.post('/like', bookController.likePost);

module.exports = router;