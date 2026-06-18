const express = require('express');
const { createWand, getWands } = require('../controllers/wandscontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', protect, createWand);
router.get('/', protect, getWands);

module.exports = router;
