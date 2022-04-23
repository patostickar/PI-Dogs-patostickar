const { Router } = require("express");
const router = Router();

const dog = require("./dog.js");
const dogs = require("./dogs.js");
const temperament = require("./temperament.js");

router.use("/dog", dog);
router.use("/dogs", dogs);
router.use("/temperament", temperament);

module.exports = router;
