const House = require('../models/housesmodel');

const createHouse = async (req, res) => {
  try {
    const { name, founder, mascot } = req.body;

    if (!name || !founder || !mascot) {
      return res.status(400).json({ message: 'Name, founder, and mascot are required' });
    }

    const house = await House.create({ name, founder, mascot });
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createHouse, getHouses };
