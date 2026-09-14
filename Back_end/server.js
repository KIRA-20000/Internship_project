const express = require("express");
 const cors = require("cors");    
require("dotenv").config();
const connectDB = require("./config/db");
const { seedCategories } = require("./seedCategories");
const { seedInternships } = require("./seedInternships");
const app = express();
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const userRoutes = require("./routes/userRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.get("/", (req, res) => {
    res.json({ message: "server is running" });
});

connectDB().then(async () => {
    try {
        await seedCategories({ closeConnection: false });
        await seedInternships({ closeConnection: false });
    } catch (error) {
        console.error("Seed error:", error.message);
    }

    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
