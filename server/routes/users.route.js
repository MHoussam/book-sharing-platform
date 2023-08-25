const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUser)
router.post("/follow", userController.followUser)

module.exports = router