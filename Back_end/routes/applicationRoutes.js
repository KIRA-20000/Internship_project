const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  applyForInternship,
  getMyApplications,
  getInternshipApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/", protect, applyForInternship);
router.get("/my", protect, getMyApplications);
router.get("/internship/:id", protect, getInternshipApplications);
router.patch("/:id/status", protect, updateApplicationStatus);
module.exports = router;
