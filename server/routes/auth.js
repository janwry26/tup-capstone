const express = require("express");
const router = express.Router();
const User = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Login Route
router.post("/", async (req, res) => {
    const { username } = req.body;
    let validPass = false;
    await User.findOne({ username })
    .then((res) => {
        //validate against hash
        validPass = bcrypt.compareSync(req.body.password, res.password);
    })
    .catch((err) => console.log(err))
    
    if (validPass) {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid Username");

        //generate JWT token
        const jwtData = {_id: user.id, username: user.username, email: user.email}
        const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "1h"})

        res.send(token);
    } else {
        return res.status(400).send("Invalid Username or Password");
    }
});

module.exports = router;
