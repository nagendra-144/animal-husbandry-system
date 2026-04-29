const express = require("express");
const router = express.Router();

const {
  createFarmer,
  getFarmers,
  deleteFarmer
} = require("../controllers/farmerController");

// CREATE
router.post("/create", createFarmer);

// GET ALL
router.get("/", getFarmers);

// DELETE
router.delete("/:id", deleteFarmer);

module.exports = router;