const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Spell name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Spell type is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Spell description is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Spell', spellSchema);
