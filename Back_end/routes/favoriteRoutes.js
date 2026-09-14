const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { addFavorite,  getMyFavorites,removeFavorite } = require("../controllers/favoriteController");

router.post("/:internshipId", protect, addFavorite);
router.get("/", protect, getMyFavorites);
router.delete("/:internshipId", protect, removeFavorite);
module.exports = router;