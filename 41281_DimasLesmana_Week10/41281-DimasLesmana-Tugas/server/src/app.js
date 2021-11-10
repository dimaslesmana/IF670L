require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const memoriesRoutes = require('./routes/memories.route');

const app = express();
const PORT = 4000;

// Database
const db = require('./models');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().single('photo'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/memories', memoriesRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`Server started! - http://localhost:${PORT}`);
});
