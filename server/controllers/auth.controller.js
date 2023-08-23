const connection = require("../configs/mongodb.connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Incorrect Email/Password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: "Incorrect Email/Password" });
    }

    const { password: hashedPassword, ...userInfo } = user

    const token = jwt.sign(userInfo, process.env.SECRET_KEY);

    res.send({ token, user: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
};

const register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    const savedUser = await newUser.save();

    console.log('SECRET_KEY:', `${process.env.SECRET_KEY}`);

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY);

    res.send({ token, user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error registering user" });
  }
};

module.exports = { register, login }