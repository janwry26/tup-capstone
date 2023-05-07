const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

router.get("/view", async (req, res) => {
    Animal.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {
    const { breedType, species, weight, gender, age, birthDate} = req.body;

    let animal = new Animal({ breedType, species, weight, gender, age, birthDate });
    await animal.save();
    
    animal = await Animal.find({animalID: animal.animalID}).sort({_id:-1}).limit(1);
    const animalID = animal[0].animalID;
    res.send("animalID #" + animalID + " has been recorded");
})

module.exports = router;
