// server.js
require("dotenv").config();

//nacteni zavislosti:
const express = require("express");
const btsDataRoutes = require("./routes/btsDataRoutes");
const gpsDataRoutes = require("./routes/gpsDataRoutes");
const app = express();

app.get("/", (req, res) => {
  res.send("Server běží správně!");
});

app.use(express.json());

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 AS connected");
    res.send(
      "Připojení k databázi na Renderu funguje! Výsledek: " +
        JSON.stringify(result.rows)
    );
  } catch (error) {
    console.error("Chyba připojení k databázi:", error);
    res.status(500).send("Nepodařilo se připojit k databázi na Renderu.");
  }
});

app.use("/phone-tracker", btsDataRoutes);
app.use("/phone-tracker", gpsDataRoutes);

//Nastavení portu a spuštění serveru
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
