const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    introSubmit,
    eduSubmit,
    expSubmit,
    projectsSubmit,
    achSubmit,
    skillsSubmit,
    profilesSubmit,

    introSubmitGet,
    eduSubmitGet,
    expSubmitGet,
    projectsSubmitGet,
    achSubmitGet,
    skillsSubmitGet,
    profilesSubmitGet,
} = require("../controllers/formController");

router.post("/intro", protect, introSubmit);
router.post("/edu", protect, eduSubmit);
router.post("/exp", protect, expSubmit);
router.post("/projects", protect, projectsSubmit);
router.post("/achievements", protect, achSubmit);
router.post("/skills", protect, skillsSubmit);
router.post("/profiles", protect, profilesSubmit);

router.get("/intro", protect, introSubmitGet);
router.get("/edu", protect, eduSubmitGet);
router.get("/exp", protect, expSubmitGet);
router.get("/projects", protect, projectsSubmitGet);
router.get("/achievements", protect, achSubmitGet);
router.get("/skills", protect, skillsSubmitGet);
router.get("/profiles", protect, profilesSubmitGet);

module.exports = router;
