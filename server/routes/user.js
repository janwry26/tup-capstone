const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register User
router.post("/register", async (req, res) => {

    const { lastName, firstName, email, contactNum, username, password } = req.body;
    
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({  lastName, firstName, email, contactNum, username, password });
    await user.save();

    res.send("Registered Successfully");
});

module.exports = router;
