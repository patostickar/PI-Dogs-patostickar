const express = require("express");
const router = express.Router();

const { getDogs } = require("../controllers/getDogs");
const { getDogDetail } = require("../controllers/getDogDetail");

router.get("/", getDogs);
router.get("/:id", getDogDetail);

module.exports = router;
