// controllers/btsDataController.js
const pool = require("../db"); //Importuje pool připojení z db.js souboru.

// Uložení BTS dat do PostgreSQL
exports.saveBTSData = async (req, res) => {
  //console.log("Požadavek na uložení BTS dat:", req.body);
  //Jedná se o asynchronní funkci (proto async), což znamená, že v ní můžeme používat await pro práci s asynchronními operacemi (např. komunikace s databází). Exportuje se jako modul, aby mohla být použita v jiných souborech (například v souboru s routami).

  const { nameBts, data } = req.body; //Z req.body (tedy z těla HTTP požadavku) extrahuje dva klíčové parametry:
  //nameBts: název záznamu BTS (unikátní identifikátor).
  //data: samotná BTS data (obvykle pole objektů nebo JSON).

  // if (!nameBts || !data) {
  //   return res.status(400).json({ error: "Chybí název nebo data BTS." });
  // }

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
  //req je objekt požadavku (request), který obsahuje informace o požadavku (např. URL parametry, tělo požadavku atd.).
  //res je objekt odpovědi (response), který slouží k odeslání odpovědi zpět klientovi (frontend).

  const { id } = req.params; //Pomocí destrukturalizace se získává id z URL parametrů (req.params).

  try {
    const result = await pool.query(
      "SELECT bts_json FROM bts_data WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Záznam nebyl nalezen" });
    }
    res.status(200).json(JSON.parse(result.rows[0].bts_json));
  } catch (error) {
    console.error("Chyba při načítání jednoho záznamu BTS:", error);
    res.status(500).json({ message: "Chyba při načítání jednoho záznamu BTS" });
  }
};
