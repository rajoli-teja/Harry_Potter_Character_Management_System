const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'House name is required'],
      trim: true,
    },
    founder: {
      type: String,
      required: [true, 'Founder is required'],
      trim: true,
    },
    mascot: {
      type: String,
      required: [true, 'Mascot is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('House', houseSchema);
