const express = require("express");
const router = express.Router();

const { createDog } = require("../controllers/createDog");

router.post("/", createDog);

module.exports = router;
