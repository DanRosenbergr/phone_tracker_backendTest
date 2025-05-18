// routes/btsDataRoutes.js
const express = require("express");
const router = express.Router();
const {
  saveBTSData,
  getBTSData,
  getSingleBTSData,
  deleteBTSData,
} = require("../controllers/btsDataController");

// router.get("/btsdata", (req, res) => {
//   res.send("BTS API je funkční.");
// });

// POST - uložení BTS dat
router.post("/btsdata", saveBTSData);

// GET - Načtení BTS dat
router.get("/btsdata", getBTSData);

// GET - Načtení jednoho BTS záznamu podle ID
router.get("/recordsBTS/:id", getSingleBTSData);

router.delete("/btsdata/:id", deleteBTSData);

module.exports = router;
