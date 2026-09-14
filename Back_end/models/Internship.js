const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },
        logo: {
    type: String,
    default: ""
},
        category: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["Full-time", "Part-time"],
            required: true
        },

        remote: {
            type: Boolean,
            default: false
        },

        requirements: {
            type: [String],
            default: []
        },

        skills: {
            type: [String],
            default: []
        },

        deadline: {
            type: Date,
            required: true
        },

        howToApply: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Internship", internshipSchema);