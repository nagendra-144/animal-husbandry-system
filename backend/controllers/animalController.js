const pool = require("../config/db");

// Register Animal
const registerAnimal = async (req, res) => {
  try {
    const { farmer_id, tag_number, type, breed, age, gender, health_status } = req.body;

    const result = await pool.query(
      `INSERT INTO animals 
       (farmer_id, tag_number, type, breed, age, gender, health_status) 
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [farmer_id, tag_number, type, breed, age, gender, health_status]
    );

    res.json({
      message: "Animal registered successfully",
      animal: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to register animal"
    });
  }
};


// Get All Animals
const getAllAnimals = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT animals.*, farmers.name AS farmer_name
      FROM animals
      JOIN farmers ON animals.farmer_id = farmers.id
      ORDER BY animals.id DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch animals"
    });

  }
};


// Animal Health History
const getAnimalHistory = async (req, res) => {
  try {

    const { id } = req.params;

    const animal = await pool.query(
      "SELECT * FROM animals WHERE id=$1",
      [id]
    );

    const vaccinations = await pool.query(
      "SELECT vaccine_name, vaccination_date, next_due_date FROM vaccinations WHERE animal_id=$1",
      [id]
    );

    const diseases = await pool.query(
      "SELECT disease_name, symptoms, treatment FROM diseases WHERE animal_id=$1",
      [id]
    );

    res.json({
      animal: animal.rows[0],
      vaccinations: vaccinations.rows,
      diseases: diseases.rows
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch animal history"
    });

  }
};


module.exports = {
  registerAnimal,
  getAllAnimals,
  getAnimalHistory
};