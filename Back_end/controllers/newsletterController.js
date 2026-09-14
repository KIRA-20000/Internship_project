const Newsletter = require("../models/Newsletter");

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
            return res.status(400).json({
                message: "Email is already subscribed"
            });
        }

        const subscriber = await Newsletter.create({
            email
        });

        res.status(201).json({
            message: "Subscribed successfully",
            subscriber
        });

    } catch (error) {
        // console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    subscribe
};