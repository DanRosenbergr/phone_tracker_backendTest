// server.js
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

//nacteni zavislosti:
const express = require("express");
const cors = require("cors");
const btsDataRoutes = require("./routes/btsDataRoutes");
const gpsDataRoutes = require("./routes/gpsDataRoutes");
const app = express();

app.use(
  cors({
    origin: "https://phone-tracker-g4kc.onrender.com", // URL tvého frontend
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server běží správně!");
});

app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(
      `Připojení k databázi je funkční. Čas na serveru: ${result.rows[0].now}`
    );
  } catch (err) {
    console.error("Chyba připojení k databázi:", err);
    res.status(500).send("Nepodařilo se připojit k databázi.");
  }
});

app.use("/phone-tracker", btsDataRoutes);
app.use("/phone-tracker", gpsDataRoutes);

//Nastavení portu a spuštění serveru
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
