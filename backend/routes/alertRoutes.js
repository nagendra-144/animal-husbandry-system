const express = require("express");
const router = express.Router();

const { getVaccinationAlerts } = require("../controllers/alertController");

router.get("/vaccination", getVaccinationAlerts);

module.exports = router;