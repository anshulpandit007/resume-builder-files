const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getResume, getLatexCode } = require("../controllers/resumeController");

router.get("/", protect, getResume);
router.get("/code", protect, getLatexCode);

module.exports = router;
