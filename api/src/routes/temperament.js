const express = require("express");
const router = express.Router();
const { temperament } = require("../controllers/temperament");

router.get("/", temperament);

module.exports = router;
