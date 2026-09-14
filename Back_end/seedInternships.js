const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Internship = require("./models/Internship");

const seedInternshipsData = [
    {
        title: "Frontend Developer Intern",
        description: "Build responsive interfaces with the product team.",
        company: "Tech Company",
        category: "Development",
        location: "Remote",
        duration: "3 Months",
        type: "Full-time",
        remote: true,
        requirements: ["Basic JavaScript", "HTML and CSS"],
        skills: ["JavaScript", "React", "CSS"],
        deadline: new Date("2027-12-31")
    },
    {
        title: "UI/UX Design Intern",
        description: "Support user research and create product designs.",
        company: "Creative Studio",
        category: "Design",
        location: "Cairo",
        duration: "6 Months",
        type: "Part-time",
        remote: false,
        requirements: ["Figma basics", "Portfolio preferred"],
        skills: ["Figma", "User Research", "Prototyping"],
        deadline: new Date("2027-12-31")
    },
    {
        title: "Data Science Intern",
        description: "Analyze business data and create useful reports.",
        company: "Data Labs",
        category: "Data Science",
        location: "Alexandria",
        duration: "3 Months",
        type: "Full-time",
        remote: false,
        requirements: ["Python basics", "Statistics basics"],
        skills: ["Python", "SQL", "Pandas"],
        deadline: new Date("2027-12-31")
    }
];

const seedInternships = async ({ closeConnection = true } = {}) => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        let company = await User.findOne({ email: "demo.company@internhub.local" });
        if (!company) {
            company = await User.create({
                name: "Demo Company",
                email: "demo.company@internhub.local",
                password: await bcrypt.hash("DemoCompany123!", 10),
                role: "company"
            });
        }

        for (const internship of seedInternshipsData) {
            await Internship.updateOne(
                { title: internship.title, company: internship.company },
                { $setOnInsert: { ...internship, createdBy: company._id } },
                { upsert: true }
            );
        }

        console.log("Sample internships are ready");
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    } finally {
        if (closeConnection && mongoose.connection.readyState) {
            await mongoose.connection.close();
        }
    }
};

if (require.main === module) {
    seedInternships();
}

module.exports = { seedInternships };
