const express = require("express");
const router = express.Router();

const {
  registerAnimal,
  getAllAnimals,
  getAnimalHistory
} = require("../controllers/animalController");

router.post("/register", registerAnimal);

router.get("/", getAllAnimals);

router.get("/:id/history", getAnimalHistory);

module.exports = router;