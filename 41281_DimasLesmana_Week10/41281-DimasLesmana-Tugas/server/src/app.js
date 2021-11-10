require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const memoriesRoutes = require('./routes/memories.route');

const app = express();
const PORT = 4000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Database
const db = require('./models');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('foto')
);
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
