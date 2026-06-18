const express = require('express');
const { createSpell, getSpells } = require('../controllers/spellscontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', protect, createSpell);
router.get('/', protect, getSpells);

module.exports = router;
