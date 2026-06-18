const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const characterRoutes = require('./routes/charactersroutes');
const houseRoutes = require('./routes/housesroutes');
const spellRoutes = require('./routes/spellsroutes');
const wandRoutes = require('./routes/wandsroutes');

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Harry Potter API Running"
    });
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/spells', spellRoutes);
app.use('/api/wands', wandRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
