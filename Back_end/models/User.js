const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "company"],
            default: "student"
        },

        phone: {
            type: String,
            default: ""
        },

        education: {
            type: String,
            default: ""
        },

        degree: {
            type: String,
            default: ""
        },

        startYear: {
            type: String,
            default: ""
        },

        endYear: {
            type: String,
            default: ""
        },

        skills: {
            type: [String],
            default: []
        },

        aboutMe: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        cv: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);