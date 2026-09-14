const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

const getStatistics = async (req, res) => {
    try {
        const activeStudents = await User.countDocuments({
            role: "student"
        });

        const internshipOpportunities = await Internship.countDocuments();

        const partnerCompanies = await User.countDocuments({
            role: "company"
        });

        const totalApplications = await Application.countDocuments();

        const acceptedApplications = await Application.countDocuments({
            status: "accepted"
        });

        const successRate =
            totalApplications === 0 ? 0  : Math.round(     (acceptedApplications / totalApplications) * 100 );

        res.status(200).json({
            activeStudents,
            internshipOpportunities,
            partnerCompanies,
            successRate
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getStatistics
};