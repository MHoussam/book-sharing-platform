const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: String,
  review: String,
  photo: String,
  user_id: { 
    type: Number, 
    ref: "User" 
  },
  author: String
});

const model = mongoose.model("Post", postSchema);
module.exports = model;