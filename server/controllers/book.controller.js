const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Post = require('../models/post.model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Define your image upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

const createPost = async (req, res) => {
  try {
    const { user_id, caption } = req.body;
    const photo = req.file ? 'images/' + req.file.filename : '';

    const post = new Post({
      user_id,
      caption,
      photo,
      uploaded_at: new Date(),
      likesNb: 0,
    });

    const savedPost = await post.save();

    res.status(201).json({
      message: 'Post created successfully!',
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating a post' });
  }
};

module.exports = {
  mongoDb,
  upload,
  createPost,
};
