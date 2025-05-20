// controllers/btsDataController.js
const pool = require("../db");

//Ulozeni BTS dat do databaze
exports.saveGPSData = async (req, res) => {
  //console.log("Požadavek na uložení BTS dat:", req.body);
  const { nameGps, data } = req.body;
  try {
    const query = `
      INSERT INTO gps_data (name, gps_json) 
      VALUES ($1, $2)
      RETURNING id;
    `;
    const result = await pool.query(query, [nameGps, JSON.stringify(data)]);

    res.status(201).json({
      message: "Data GPS úspěšně uložena.",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chyba při ukládání dat." });
  }
};

// Nacteni vsech GPS zaznamu
exports.getGPSData = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM gps_data");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Chyba při načítání dat GPS:", error);
    res.status(500).json({ message: "Chyba při načítání dat GPS" });
  }
};

// Jeden GPS zaznam
exports.getSingleGPSData = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT gps_json FROM gps_data WHERE id = $1",
      [id]
    );
    res.status(200).json(result.rows[0].gps_json);
  } catch (error) {
    console.error("Chyba při načítání jednoho záznamu GPS:", error);
    res.status(500).json({ message: "Chyba při načítání jednoho záznamu GPS" });
  }
};
// Smazani jednoho zaznamu
exports.deleteGPSData = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM gps_data WHERE id = $1", [id]);
    res.status(200).json({ message: "Zaznam uspesne smazan." });
  } catch (error) {
    console.log("Chyba pri mazani programu", error);
    res.status(500).json({ message: "Chyba pri mazani bts zaznamu." });
  }
};
