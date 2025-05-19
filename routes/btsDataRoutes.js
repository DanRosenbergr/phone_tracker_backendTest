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

router.post("/btsdata", saveBTSData);
router.get("/btsdata", getBTSData);
router.get("/recordsBTS/:id", getSingleBTSData);
router.delete("/btsdata/:id", deleteBTSData);

module.exports = router;
