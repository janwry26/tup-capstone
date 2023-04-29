const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

//User Information
router.get("/", auth, async (req, res) => {
    const profile = await User.findById(req.user._id);
    res.send(profile);
})

// Register User
router.post("/register", async (req, res) => {

    const { lastName, firstName, email, contactNum, username } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({  lastName, firstName, email, contactNum, username, password });
    await user.save();

    const jwtData = {_id: user.id, username: user.username, email: user.email}
    const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: '1h' })

    res.send(token);
});

router.get("/view", async (req, res) => {
    User.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
