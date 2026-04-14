const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, phone, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, phone, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, phone, hashedPassword, role]
    );

    res.json({ message: "User created", userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
};

const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE phone=$1",
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
};

module.exports = { register, login };