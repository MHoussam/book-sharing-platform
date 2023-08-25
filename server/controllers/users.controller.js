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
  const { followerId: followerId, followeeId: followeeId } = req.body;

  try {
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);    

    const isFollowing = follower.following.includes(followeeId);

    if (isFollowing) {
      const updatedFollowing = follower.following.filter((id) => id.toString() !== followeeId.toString());
      follower.following = updatedFollowing;
      console.log('sssss')
    } else {
      follower.following.push(followeeId);
    }

    await follower.save();

    res.status(200).json({ message: isFollowing ? "Unfollowe" : "Followed" });
  } catch (error) {
    console.error("Error following/unfollowing user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
    followUser,
    getAllUsers,
    getUser,
}