const User = require("../models/User");

const getStudents = async (req, res) => {
    try {
        const { skill } = req.query;

        const filter = {
            role: "student"
        };

        if (skill) {
            filter.skills = {
                $regex: skill,
                $options: "i"
            };
        }

        const students = await User.find(filter)
            .select("-password")
            .sort({ name: 1 });

        res.status(200).json({
            count: students.length,
            students
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getStudents
};