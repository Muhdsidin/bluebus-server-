const express = require("express");
const router = express.Router();
const { AgencyAuth } = require("../middleware/AgencyAuth");
const { addTrip, Reigister, Login, getTrip, deleteTrip } = require("../controllers/PartnerController");

router.get("/", (req, res) => {
    res.send("hello partner");
})

router.post("/add-trip", AgencyAuth , addTrip)
router.post("/register" ,Reigister )
router.post("/login" ,Login )
router.post("/add-trip" ,AgencyAuth , addTrip )
router.get("/get-trip" ,AgencyAuth , getTrip  )
router.post("/delete-trip"  ,AgencyAuth , deleteTrip  )

module.exports = router