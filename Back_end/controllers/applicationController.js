const Application = require("../models/Application");
const Internship = require("../models/Internship");

const applyForInternship = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can apply for internships"
            });
        }
        const { internshipId } = req.body;

        if (!internshipId) {
            return res.status(400).json({
                message: "Please provide internshipId"
            });
        }

        const internship = await Internship.findById(internshipId);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        if (new Date() > new Date(internship.deadline)) {
            return res.status(400).json({
                message: "Application deadline has passed"
            });
        }

        const existingApplication = await Application.findOne({
            student: req.user.userId,
            internship: internshipId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this internship"
            });
        }
        const application = await Application.create({
            student: req.user.userId,
            internship: internshipId
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getMyApplications = async (req, res) => {
    try {
    
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can view their applications"
            });
        }

        const applications = await Application.find({
            student: req.user.userId
        }).populate("internship");

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getInternshipApplications = async (req, res) => {
    try {
        if (req.user.role !== "company") {
            return res.status(403).json({
                message: "Only companies can view applicants"
            });
        }

        const { id } = req.params;

        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }
        if (internship.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to view these applications"
            });
        }

        const applications = await Application.find({
            internship: id
        }).populate(
            "student",
            "name email phone education skills aboutMe location"
        );

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const updateApplicationStatus = async (req, res) => {
    try {
        if (req.user.role !== "company") {
            return res.status(403).json({
                message: "Only companies can update application status"
            });
        }

        const { id } = req.params;
        const { status } = req.body;
        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be accepted or rejected"
            });
        }
        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }
        const internship = await Internship.findById(
            application.internship
        );

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }
        if (internship.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to update this application"
            });
        }
        application.status = status;

        const updatedApplication = await application.save();

        res.status(200).json({
            message: "Application status updated successfully",
            application: updatedApplication
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {applyForInternship, getMyApplications, getInternshipApplications, updateApplicationStatus};