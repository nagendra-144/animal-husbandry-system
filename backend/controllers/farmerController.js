const pool = require("../config/db");

exports.createFarmer = async (req, res) => {
  try {
    const { name, phone, village, mandal, district } = req.body;

    const result = await pool.query(
      "INSERT INTO farmers (name, phone, village, mandal, district) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, phone, village, mandal, district]
    );

    res.json({
      message: "Farmer created successfully",
      farmer: result.rows[0]
    });

  } catch (error) {

    console.log("DATABASE ERROR:", error);   // IMPORTANT

    res.status(500).json({
      error: "Failed to create farmer",
      details: error.message
    });

  }
};