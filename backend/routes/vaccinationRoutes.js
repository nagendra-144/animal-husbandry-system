const express = require("express");
const router = express.Router();

const { addVaccination, upcomingVaccinations } = require("../controllers/vaccinationController");

router.post("/add", addVaccination);
router.get("/upcoming", upcomingVaccinations);
module.exports = router;