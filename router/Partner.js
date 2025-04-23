const express = require("express");
const router = express.Router();
const { AgencyAuth } = require("../middleware/AgencyAuth");
const { addTrip, Reigister } = require("../controllers/PartnerController");

router.get("/", (req, res) => {
    res.send("hello partner");
})

router.post("/add-trip", AgencyAuth , addTrip)
router.post("/register" ,Reigister )

module.exports = router