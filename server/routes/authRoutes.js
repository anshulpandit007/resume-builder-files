const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { disableAuth } = require("../middleware/authMiddleware");

router.post("/register", disableAuth, registerUser);
router.post("/login", disableAuth, loginUser);

module.exports = router;