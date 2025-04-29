const express = require("express");
const { FindBus } = require("../controllers/UserController");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello User");
})

router.post("/bus", FindBus) 

module.exports = router 