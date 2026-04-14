const express = require("express");
const router = express.Router();

const { getAdminAnalytics } = require("../controllers/adminController");

router.get("/analytics", getAdminAnalytics);

module.exports = router;