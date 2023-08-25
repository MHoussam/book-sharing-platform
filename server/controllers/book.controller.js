const mongoose = require('mongoose');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const { upload } = require('../middlewares/multer.middleware');

const createPost = async (req, res) => {
  try {
    const { userId, name, author, review } = req.body;
    const photo = req.file ? 'images/' + req.file.filename : '';

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('here: ' + req.file)
    console.log('name: ' + req.file.filename)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('name: ' +user._id)
    console.log('name: ' +user.first_name)

    const post = new Post({
      name,
      author,
      review,
      photo,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
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

const getPosts = async (req,res) => {
  const books = await Post.find();
  res.send(books);
}

const getLikedPosts = async (req,res) => {
  try {
    const { userId } = req.body;

    const likedPosts = await Post.find({ 'like.id': userId }, '_id');

    const likedPostIds = likedPosts.map((post) => post._id);

    res.status(200).json({
      likedPostIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching liked posts' });
  }
}

const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isLiked = post.like.find((like) => like.id.equals(userId));

    if (isLiked) {
      post.like = post.like.filter((like) => !like.id.equals(userId));
    } else {
      post.like.push({ id: userId });
    }

    const updatedPost = await post.save();

    res.status(200).json({ message: isLiked ? 'Unliked' : 'Liked', updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error liking/unliking the post' });
  }
};

module.exports = {
  likePost,
  getLikedPosts,
  getPosts,
  createPost,
};
