const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: String,
  review: String,
  photo: String,
  author: String,
  user: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    first_name: { type: mongoose.Schema.Types.String, ref: "User" },
    last_name: { type: mongoose.Schema.Types.String, ref: "User" },
  },
  like: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ]
});

const model = mongoose.model("Post", postSchema);
module.exports = model;