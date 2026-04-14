const pool = require("../config/db");

const getVaccinationAlerts = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT 
        animals.id AS animal_id,
        animals.tag_number,
        farmers.name AS farmer_name,
        vaccinations.vaccine_name,
        vaccinations.next_due_date
      FROM vaccinations
      JOIN animals ON vaccinations.animal_id = animals.id
      JOIN farmers ON animals.farmer_id = farmers.id
      WHERE vaccinations.next_due_date 
      BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
      ORDER BY vaccinations.next_due_date ASC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch vaccination alerts"
    });
  }
};

module.exports = {
  getVaccinationAlerts
};