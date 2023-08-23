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

const createUser = async (req,res) => {
    const { password, first_name, last_name, email } = req.body

    if (!password || !first_name || !last_name || !email) {
        console.log('password: ' + password + '    first: ' + first_name + '    last: ' + last_name + '    email: ' + email)
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('pass: ' + hashedPassword)
        const user = new User({
            email,
            password: hashedPassword,
            first_name,
            last_name
        })
        await user.save();

        res.status(201).json({
            message: 'User created successfully!',
            user: user
        });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
  
    if (last_name !== "") dataToUpade.last_name = last_name
    const user = await User.findByIdAndUpdate(id, {
      $set: { first_name, last_name },
  
    }, {
      new: true
    })
  
    res.send(user)
  }

const deleteUser = (req,res) => {
    res.send("delete users")
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}