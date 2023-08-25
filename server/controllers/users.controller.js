const connection = require("../configs/mongodb.connection")
const bcrypt = require("bcrypt")
const User = require("../models/user.model"); 

const getAllUsers = async (req,res) => {
    const users = await User.find();
    res.send(users);
}

const getUser = async (req,res) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password")
    res.send(user)
}

const followUser = async (req, res) => {
    const { followerId, followeeId } = req.params;
  
    try {
      const follower = await User.findById(followerId);
      const followee = await User.findById(followeeId);
  
      if (follower.following.includes(followeeId)) {
        return res.status(400).json({ message: "Already following this user." });
      }
  
      follower.following.push(followeeId);
  
      await follower.save();
      await followee.save();
  
      res.status(200).json({ message: "User followed successfully." });
    } catch (error) {
      console.error("Error following user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

module.exports = {
    followUser,
    getAllUsers,
    getUser,
}