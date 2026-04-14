const pool = require("../config/db");

exports.reportDisease = async (req, res) => {
 try {

  const { animal_id, disease_name, symptoms, treatment } = req.body;

  const result = await pool.query(
   `INSERT INTO diseases 
   (animal_id, disease_name, symptoms, treatment)
   VALUES ($1,$2,$3,$4)
   RETURNING *`,
   [animal_id, disease_name, symptoms, treatment]
  );

  res.json({
   message: "Disease reported successfully",
   disease: result.rows[0]
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   error: "Failed to report disease"
  });

 }
};

exports.getOutbreaks = async (req, res) => {
 try {

  const result = await pool.query(`
   SELECT 
     diseases.disease_name,
     farmers.village,
     farmers.district,
     COUNT(diseases.id) AS cases
   FROM diseases
   JOIN animals ON diseases.animal_id = animals.id
   JOIN farmers ON animals.farmer_id = farmers.id
   WHERE diseases.status = 'ACTIVE'
   GROUP BY diseases.disease_name, farmers.village, farmers.district
   HAVING COUNT(diseases.id) >= 2
   ORDER BY cases DESC
  `);

  res.json(result.rows);

 } catch (error) {
  console.error(error);
  res.status(500).json({
   error: "Failed to detect outbreaks"
  });
 }
};

exports.getDiseaseHeatmap = async (req, res) => {
 try {

  const result = await pool.query(`
   SELECT 
     farmers.district,
     farmers.village,
     diseases.disease_name,
     COUNT(diseases.id) AS cases
   FROM diseases
   JOIN animals ON diseases.animal_id = animals.id
   JOIN farmers ON animals.farmer_id = farmers.id
   WHERE diseases.status = 'ACTIVE'
   GROUP BY farmers.district, farmers.village, diseases.disease_name
   ORDER BY cases DESC
  `);

  res.json(result.rows);

 } catch (error) {
  console.error(error);
  res.status(500).json({
   error: "Failed to load disease heatmap"
  });
 }
};