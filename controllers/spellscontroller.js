const Spell = require('../models/spellsmodel');

const createSpell = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    if (!name || !type || !description) {
      return res.status(400).json({ message: 'Name, type, and description are required' });
    }

    const spell = await Spell.create({ name, type, description });
    res.status(201).json(spell);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpells = async (req, res) => {
  try {
    const spells = await Spell.find();
    res.json(spells);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSpell, getSpells };
