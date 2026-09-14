const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createInternship , getInternships, getMyInternships, getInternshipById, updateInternship, deleteInternship, getFeaturedInternships } = require("../controllers/internshipController");

router.get("/", getInternships);
router.get("/my", protect, getMyInternships);
router.get("/featured", getFeaturedInternships);

router.get("/:id", getInternshipById);

router.post("/", protect, createInternship);

router.put("/:id", protect, updateInternship);

router.delete("/:id", protect, deleteInternship);

module.exports = router;