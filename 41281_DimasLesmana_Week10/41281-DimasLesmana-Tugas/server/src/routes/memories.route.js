const express = require('express');
const memoriesController = require('../controllers/memories.controller');

const router = express.Router();

router.get('/', memoriesController.getAllMemories);
router.post('/', memoriesController.createMemory);

module.exports = router;
