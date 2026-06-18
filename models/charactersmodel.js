const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Character name is required'],
      trim: true,
    },
    house: {
      type: String,
      required: [true, 'House is required'],
      trim: true,
    },
    wand: {
      type: String,
      required: [true, 'Wand description is required'],
      trim: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Character', characterSchema);
