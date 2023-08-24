const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: "Custom: Email is required"
  },
  password: String,
  first_name: String,
  last_name: String
})

const user = mongoose.model("user", userSchema)
module.exports = user;