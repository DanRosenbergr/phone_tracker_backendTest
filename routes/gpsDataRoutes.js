// routes/btsDataRoutes.js
const express = require("express");
const router = express.Router();
const {
  saveGPSData,
  getGPSData,
  getSingleGPSData,
  deleteGPSData,
} = require("../controllers/gpsDataController");

// router.get("/btsdata", (req, res) => {
//   res.send("BTS API je funkční.");
// });

router.post("/gpsdata", saveGPSData);
router.get("/gpsdata", getGPSData);
router.get("/recordsGPS/:id", getSingleGPSData);
router.delete("/gpsdata/:id", deleteGPSData);

module.exports = router;
