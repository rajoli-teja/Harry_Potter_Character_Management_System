const Character = require('../models/charactersmodel');
const cloudinary = require('../config/cloudinary');

const getUploadData = (file) => {
  const url = file?.path || file?.secure_url || file?.url;
  const public_id = file?.filename || file?.public_id || file?.publicId || file?.id;
  return { url, public_id };
};

const createCharacter = async (req, res) => {
  try {
    const { name, house, wand } = req.body;
    const uploadData = getUploadData(req.file);

    if (!uploadData.url || !uploadData.public_id) {
      return res.status(400).json({ message: 'Character image upload failed or is missing' });
    }

    if (!name || !house || !wand) {
      return res.status(400).json({ message: 'Name, house, and wand are required' });
    }

    const character = await Character.create({
      name,
      house,
      wand,
      image: {
        url: uploadData.url,
        public_id: uploadData.public_id,
      },
    });

    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    const { name, house, wand } = req.body;
    const uploadData = getUploadData(req.file);

    if (name) character.name = name;
    if (house) character.house = house;
    if (wand) character.wand = wand;

    if (uploadData.url && uploadData.public_id) {
      if (character.image?.public_id) {
        await cloudinary.uploader.destroy(character.image.public_id);
      }

      character.image = {
        url: uploadData.url,
        public_id: uploadData.public_id,
      };
    }

    const updatedCharacter = await character.save();
    res.json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    if (character.image.public_id) {
      await cloudinary.uploader.destroy(character.image.public_id);
    }

    await character.remove();
    res.json({ message: 'Character removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
