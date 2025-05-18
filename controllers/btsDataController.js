// controllers/btsDataController.js
const pool = require("../db");

//Ulozeni BTS dat do databaze
exports.saveBTSData = async (req, res) => {
  //console.log("Požadavek na uložení BTS dat:", req.body);
  const { nameBts, data } = req.body;
  try {
    const query = `
      INSERT INTO bts_data (name, bts_json) 
      VALUES ($1, $2)
      RETURNING id;
    `;
    const result = await pool.query(query, [nameBts, JSON.stringify(data)]);

    res.status(201).json({
      message: "Data BTS úspěšně uložena.",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chyba při ukládání dat." });
  }
};

// Načtení všech BTS záznamů
exports.getBTSData = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM bts_data");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Chyba při načítání dat BTS:", error);
    res.status(500).json({ message: "Chyba při načítání dat BTS" });
  }
};

// Načtení jednoho BTS záznamu podle ID
exports.getSingleBTSData = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT bts_json FROM bts_data WHERE id = $1",
      [id]
    );
    res.status(200).json(result.rows[0].bts_json);
  } catch (error) {
    console.error("Chyba při načítání jednoho záznamu BTS:", error);
    res.status(500).json({ message: "Chyba při načítání jednoho záznamu BTS" });
  }
};
exports.deleteBTSData = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM bts_data WHERE id = $1", [id]);
    res.status(200).json({ message: "Zaznam uspesne smazan." });
  } catch (error) {
    console.log("Chyba pri mazani programu", error);
    res.status(500).json({ message: "Chyba pri mazani bts zaznamu." });
  }
};
