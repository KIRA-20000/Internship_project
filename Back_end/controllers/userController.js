const User = require("../models/User");
const path = require("path");
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            user
        });
    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const {
            name,
            email,
            phone,
            education,
            degree,
            startYear,
            endYear,
            skills,
            aboutMe,
            location
        } = req.body;
if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email"
        });
    }

    const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.userId }
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
}
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.education = education ?? user.education;
        user.degree = degree ?? user.degree;
        user.startYear = startYear ?? user.startYear;
        user.endYear = endYear ?? user.endYear;
        user.skills = skills ?? user.skills;
        user.aboutMe = aboutMe ?? user.aboutMe;
        user.location = location ?? user.location;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                education: updatedUser.education,
                degree: updatedUser.degree,
                startYear: updatedUser.startYear,
                endYear: updatedUser.endYear,
                skills: updatedUser.skills,
                aboutMe: updatedUser.aboutMe,
                location: updatedUser.location
            }
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const uploadCV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "CV file is required"
            });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.cv = req.file.filename;

        await user.save();

        res.status(200).json({
            message: "CV uploaded successfully",
            cv: user.cv
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const downloadCV = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.cv) {
            return res.status(404).json({
                message: "CV not found"
            });
        }

        const filePath = path.join(__dirname, "..", "uploads", user.cv);
        const extension = path.extname(user.cv).toLowerCase();
        const mimeType = extension === ".pdf"
            ? "application/pdf"
            : "application/octet-stream";

        res.setHeader("Content-Type", mimeType);
        res.setHeader("Content-Disposition", `inline; filename="${user.cv}"`);
        res.sendFile(filePath);

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    getProfile,
    updateProfile,
    uploadCV,
    downloadCV
};