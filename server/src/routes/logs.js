const express = require('express');
const logController = require('../controllers/logsController'); 
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// POST route to add a daily log
router.post('/log', authMiddleware, logController.addLog);

// GET route to retrieve logs for a user
router.get('/logs/:userId', logController.getLogs);

module.exports = router;

