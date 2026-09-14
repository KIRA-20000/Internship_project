const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { getProfile, updateProfile, uploadCV,  downloadCV} = require("../controllers/userController");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);
router.post("/profile/cv", protect, upload.single("cv"), uploadCV);
router.get("/profile/cv", protect, downloadCV);
module.exports = router;