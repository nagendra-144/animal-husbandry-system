const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* -----------------------
   Root Route
----------------------- */
app.get("/", (req, res) => {
  res.send("Animal Husbandry API is running");
});

/* -----------------------
   Database Test
----------------------- */

const pool = require("./config/db");

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection failed");
  }
});

/* -----------------------
   Auth Routes
----------------------- */

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

/* -----------------------
   Protected Route
----------------------- */

const verifyToken = require("./middleware/authMiddleware");

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

/* -----------------------
   Role Protected Route
----------------------- */

const checkRole = require("./middleware/roleMiddleware");

app.get(
  "/api/admin/dashboard",
  verifyToken,
  checkRole(["ADMIN"]),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

/* -----------------------
   Start Server
----------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const farmerRoutes = require("./routes/farmerRoutes");
app.use("/api/farmers", farmerRoutes);
const animalRoutes = require("./routes/animalRoutes");
app.use("/api/animals", animalRoutes);
const vaccinationRoutes = require("./routes/vaccinationRoutes");
app.use("/api/vaccinations", vaccinationRoutes);
const diseaseRoutes = require("./routes/diseaseRoutes");
app.use("/api/diseases", diseaseRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);
const alertRoutes = require("./routes/alertRoutes");
app.use("/api/alerts", alertRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);