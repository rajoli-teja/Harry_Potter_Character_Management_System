const express = require('express');
const { createHouse, getHouses } = require('../controllers/housescontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', protect, createHouse);
router.get('/', protect, getHouses);

module.exports = router;
