const express = require('express');
const {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterscontroller');
const { protect } = require('../middleware/authmiddleware');
const uploadImage = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, uploadImage, createCharacter);
router.get('/', protect, getCharacters);
router.get('/:id', protect, getCharacterById);
router.put('/:id', protect, uploadImage, updateCharacter);
router.delete('/:id', protect, deleteCharacter);

module.exports = router;
