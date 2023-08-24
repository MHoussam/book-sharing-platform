const mongoose = require('mongoose');
const Post = require('../models/post.model');
const { upload } = require('../middlewares/multer.middleware'); // Import the upload middleware

const createPost = async (req, res) => {
  try {
    const { user_id, name, author, review } = req.body;
    const photo = req.file ? 'images/' + req.file.filename : '';

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('here: ' + req.file)
    console.log('name: ' + req.file.filename)

    const post = new Post({
      user_id,
      name,
      author,
      review,
      photo,
      uploaded_at: new Date(),
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
  createPost,
};
