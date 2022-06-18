const express = require('express');
const router = express.Router();

const { createDog } = require('../controllers/createDog');
const { deleteDog } = require('../controllers/deleteDog');

router.post('/', createDog);
router.delete('/:idRaza', deleteDog);

module.exports = router;
