const mongoose = require("mongoose")

const mongoDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/bookSharing")
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports = mongoDb