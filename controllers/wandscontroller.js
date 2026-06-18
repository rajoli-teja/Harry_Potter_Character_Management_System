const Wand = require('../models/wandsmodel');

const createWand = async (req, res) => {
  try {
    const { wood, core, length, owner } = req.body;

    if (!wood || !core || !length || !owner) {
      return res.status(400).json({ message: 'Wood, core, length, and owner are required' });
    }

    const wand = await Wand.create({ wood, core, length, owner });
    res.status(201).json(wand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWands = async (req, res) => {
  try {
    const wands = await Wand.find();
    res.json(wands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createWand, getWands };
