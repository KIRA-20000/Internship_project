const Favorite = require("../models/Favorite");
const Internship = require("../models/Internship");

const addFavorite = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can add favorites"
            });
        }

        const { internshipId } = req.params;


        const internship = await Internship.findById(internshipId);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        const existingFavorite = await Favorite.findOne({
            student: req.user.userId,
            internship: internshipId
        });

        if (existingFavorite) {
            return res.status(400).json({
                message: "Internship is already in favorites"
            });
        }


        const favorite = await Favorite.create({
            student: req.user.userId,
            internship: internshipId
        });

        res.status(201).json({
            message: "Internship added to favorites",
            favorite
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getMyFavorites = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can view favorites"
            });
        }
        const favorites = await Favorite.find({
            student: req.user.userId
        }).populate("internship");

        res.status(200).json({
            count: favorites.length,
            favorites
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const removeFavorite = async (req, res) => {
    try {

        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can remove favorites"
            });
        }

        const { internshipId } = req.params;
        const favorite = await Favorite.findOne({
            student: req.user.userId,
            internship: internshipId
        });

        if (!favorite) {
            return res.status(404).json({
                message: "Internship is not in your favorites"
            });
        }

        await Favorite.findByIdAndDelete(favorite._id);

        res.status(200).json({
            message: "Internship removed from favorites"
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = { addFavorite , getMyFavorites, removeFavorite };