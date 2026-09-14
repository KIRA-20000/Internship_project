const Internship = require("../models/Internship");
const Internship = require("../models/Internship");
const createInternship = async (req, res) => {
    try {

        if (req.user.role !== "company") {
            return res.status(403).json({
                message: "Only companies can create internships"
            });
        }

        const {
            title,
            description,
            company,
            logo,
            category,
            location,
            duration,
            type,
            remote,
            requirements,
            skills,
            deadline,
            howToApply
        } = req.body;

        if (
            !title ||
            !description ||
            !company ||
            !category ||
            !location ||
            !duration ||
            !type ||
            !deadline
        ) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }
if (!["Full-time", "Part-time"].includes(type)) {
    return res.status(400).json({
        message: "Type must be Full-time or Part-time"
    });
}

if (isNaN(new Date(deadline).getTime())) {
    return res.status(400).json({
        message: "Please provide a valid deadline"
    });
}

if (new Date(deadline) <= new Date()) {
    return res.status(400).json({
        message: "Deadline must be in the future"
    });
}

if (requirements && !Array.isArray(requirements)) {
    return res.status(400).json({
        message: "Requirements must be an array"
    });
}

if (skills && !Array.isArray(skills)) {
    return res.status(400).json({
        message: "Skills must be an array"
    });
}
        const internship = await Internship.create({
            title,
            description,
            company,
            logo,
            category,
            location,
            duration,
            type,
            remote: remote || false,
            requirements: requirements || [],
            skills: skills || [],
            deadline,
            howToApply: howToApply || "",
            createdBy: req.user.userId
        });

        res.status(201).json({
            message: "Internship created successfully",
            internship
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getInternships = async (req, res) => {
    try {
        const {
            search,
            category,
            location,
            duration
        } = req.query;

        const filter = {};
    if (search && search.toLowerCase() !== "all") {
    filter.$or = [
        {
            title: {
                $regex: search,
                $options: "i"
            }
        },
        {
            company: {
                $regex: search,
                $options: "i"
            }
        },
        {
            skills: {
                $regex: search,
                $options: "i"
            }
        }
    ];
}
        if (category && category.toLowerCase() !== "all") {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        if (location && location.toLowerCase() !== "all") {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }
        if (duration && duration.toLowerCase() !== "all") {
            filter.duration = {
                $regex: duration,
                $options: "i"
            };
        }

        const internships = await Internship.find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: internships.length,
            internships
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getMyInternships = async (req, res) => {
    try {
        const internships = await Internship.find({ createdBy: req.user.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: internships.length,
            internships
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getInternshipById = async (req, res) => {
    try {
        const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        message: "Invalid internship ID"
    });
}
        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json({
            internship
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const updateInternship = async (req, res) => {
    try {

        if (req.user.role !== "company") {
            return res.status(403).json({
                message: "Only companies can update internships"
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
                message: "You can only update your own internships"
            });
        }

     
        const {
            title,
            description,
            company,
            logo,
            category,
            location,
            duration,
            type,
            remote,
            requirements,
            skills,
            deadline
        } = req.body;
if (type !== undefined && !["Full-time", "Part-time"].includes(type)) {
    return res.status(400).json({
        message: "Type must be Full-time or Part-time"
    });
}

if (deadline !== undefined) {
    if (isNaN(new Date(deadline).getTime())) {
        return res.status(400).json({
            message: "Please provide a valid deadline"
        });
    }

    if (new Date(deadline) <= new Date()) {
        return res.status(400).json({
            message: "Deadline must be in the future"
        });
    }
}

if (requirements !== undefined && !Array.isArray(requirements)) {
    return res.status(400).json({
        message: "Requirements must be an array"
    });
}

if (skills !== undefined && !Array.isArray(skills)) {
    return res.status(400).json({
        message: "Skills must be an array"
    });
}
        internship.title = title ?? internship.title;
        internship.description = description ?? internship.description;
        internship.company = company ?? internship.company;
        internship.logo = logo ?? internship.logo;
        internship.category = category ?? internship.category;
        internship.location = location ?? internship.location;
        internship.duration = duration ?? internship.duration;
        internship.type = type ?? internship.type;
        internship.remote = remote ?? internship.remote;
        internship.requirements = requirements ?? internship.requirements;
        internship.skills = skills ?? internship.skills;
        internship.deadline = deadline ?? internship.deadline;

        const updatedInternship = await internship.save();

        res.status(200).json({
            message: "Internship updated successfully",
            internship: updatedInternship
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const deleteInternship = async (req, res) => {
    try {
        if (req.user.role !== "company") {
            return res.status(403).json({
                message: "Only companies can delete internships"
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
                message: "You can only delete your own internships"
            });
        }

        await Internship.findByIdAndDelete(id);

        res.status(200).json({
            message: "Internship deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getFeaturedInternships = async (req, res) => {
    try {
        const internships = await Internship.find()
            .sort({ createdAt: -1 })
            .limit(4);

        res.status(200).json({
            count: internships.length,
            internships
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createInternship,
    getInternships,
    getMyInternships,
    getInternshipById,
    updateInternship,
    deleteInternship,
    getFeaturedInternships
};