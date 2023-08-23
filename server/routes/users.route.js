const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUser)
router.post("/", userController.createUser)
router.put("/:d", userController.updateUser)
router.delete("/:d", userController.deleteUser)

module.exports = router