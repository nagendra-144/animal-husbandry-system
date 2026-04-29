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
  console.error("REAL ERROR:", error);  // 👈 important
  res.status(500).json({
    error: error.message   // 👈 show actual issue
  });
}
};

// GET ALL FARMERS
exports.getFarmers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM farmers ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch farmers" });
  }
};

// DELETE FARMER
exports.deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM farmers WHERE id=$1", [id]);
    res.json({ message: "Farmer deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete farmer" });
  }
};