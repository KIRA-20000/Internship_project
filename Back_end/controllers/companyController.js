const User = require("../models/User");

const getCompanies = async (req, res) => {
    try {
        const companies = await User.find({
            role: "company"
        })
            .select("-password")
            .sort({ name: 1 });

        res.status(200).json({
            count: companies.length,
            companies
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getCompanies
};