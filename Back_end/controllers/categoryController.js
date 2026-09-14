const Category = require("../models/Category");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .sort({ name: 1 });

        res.status(200).json({
            count: categories.length,
            categories
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getCategories
};