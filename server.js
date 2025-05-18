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
app.use("/phone-tracker", btsDataRoutes);
app.use("/phone-tracker", gpsDataRoutes);

//Nastavení portu a spuštění serveru
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
