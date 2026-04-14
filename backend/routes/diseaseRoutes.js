const express = require("express");
const router = express.Router();

const { reportDisease, getOutbreaks, getDiseaseHeatmap } = require("../controllers/diseaseController");

router.post("/report", reportDisease);

router.get("/outbreaks", getOutbreaks);

router.get("/heatmap", getDiseaseHeatmap);

module.exports = router;