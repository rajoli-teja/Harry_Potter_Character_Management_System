const mongoose = require('mongoose');

const wandSchema = new mongoose.Schema(
  {
    wood: {
      type: String,
      required: [true, 'Wand wood is required'],
      trim: true,
    },
    core: {
      type: String,
      required: [true, 'Wand core is required'],
      trim: true,
    },
    length: {
      type: Number,
      required: [true, 'Wand length is required'],
    },
    owner: {
      type: String,
      required: [true, 'Owner is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wand', wandSchema);
