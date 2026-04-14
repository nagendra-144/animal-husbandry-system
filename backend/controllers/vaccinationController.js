const pool = require("../config/db");

exports.addVaccination = async (req, res) => {
 try {
  const { animal_id, vaccine_name, vaccination_date, next_due_date, notes } = req.body;

  const result = await pool.query(
   `INSERT INTO vaccinations 
    (animal_id, vaccine_name, vaccination_date, next_due_date, notes)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
   [animal_id, vaccine_name, vaccination_date, next_due_date, notes]
  );

  res.json({
   message: "Vaccination added",
   vaccination: result.rows[0]
  });

 } catch (error) {
  console.error(error);
  res.status(500).json({
   error: "Failed to add vaccination"
  });
 }
};

exports.upcomingVaccinations = async (req, res) => {
 try {

  const result = await pool.query(`
   SELECT 
    animals.id AS animal_id,
    animals.tag_number,
    animals.type,
    farmers.name AS farmer_name,
    vaccinations.vaccine_name,
    vaccinations.next_due_date
   FROM vaccinations
   JOIN animals ON vaccinations.animal_id = animals.id
   JOIN farmers ON animals.farmer_id = farmers.id
   WHERE vaccinations.next_due_date 
   BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
   ORDER BY vaccinations.next_due_date
  `);

  res.json(result.rows);

 } catch (error) {
  console.error(error);
  res.status(500).json({
   error: "Failed to fetch upcoming vaccinations"
  });
 }
};