const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Custom: Email is required",
    unique: true,
  },
  password: String,
  first_name: String,
  last_name: String
})

const user = mongoose.model("user", userSchema)
module.exports = user;