const express = require("express");
const router = express.Router();

const farmerController = require("../controllers/farmerController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/create", verifyToken, farmerController.createFarmer);

module.exports = router;