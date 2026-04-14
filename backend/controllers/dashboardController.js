const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {

    const farmers = await pool.query("SELECT COUNT(*) FROM farmers");
    const animals = await pool.query("SELECT COUNT(*) FROM animals");

    const vaccinationsDue = await pool.query(`
      SELECT COUNT(*) FROM vaccinations
      WHERE next_due_date <= CURRENT_DATE + INTERVAL '7 days'
    `);

    const diseases = await pool.query("SELECT COUNT(*) FROM diseases");

    const outbreaks = await pool.query(`
      SELECT COUNT(*) FROM (
        SELECT disease_name
        FROM diseases
        GROUP BY disease_name
        HAVING COUNT(*) >= 2
      ) AS outbreak_cases
    `);

    res.json({
      total_farmers: farmers.rows[0].count,
      total_animals: animals.rows[0].count,
      vaccinations_due: vaccinationsDue.rows[0].count,
      disease_cases: diseases.rows[0].count,
      outbreaks: outbreaks.rows[0].count
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
};

module.exports = { getDashboardStats };