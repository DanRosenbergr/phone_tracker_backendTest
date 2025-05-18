// server.js
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

//nacteni zavislosti:
const express = require("express");
const btsDataRoutes = require("./routes/btsDataRoutes");
const gpsDataRoutes = require("./routes/gpsDataRoutes");
const app = express();

app.get("/", (req, res) => {
  res.send("Server běží správně!");
});

app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Chyba připojení k databázi:", err);
  } else {
    console.log("Úspěšné připojení k databázi, čas:", res.rows[0].now);
  }
});

app.use("/phone-tracker", btsDataRoutes);
app.use("/phone-tracker", gpsDataRoutes);

//Nastavení portu a spuštění serveru
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
