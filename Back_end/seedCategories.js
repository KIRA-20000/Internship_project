const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("./models/Category");

const categories = [
    { name: "Development" },
    { name: "Design" },
    { name: "Marketing" },
    { name: "Data Science" },
    { name: "Cyber Security" },
    { name: "Mobile Development" }
];

const seedCategories = async ({ closeConnection = true } = {}) => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB connected successfully");
        }

        await Category.deleteMany();
        await Category.insertMany(categories);

        console.log("Categories added successfully");
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
    seedCategories();
}

module.exports = { seedCategories };