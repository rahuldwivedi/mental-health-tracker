const express = require('express');
const logController = require('../controllers/logsController');

const router = express.Router();

// POST route to add a daily log
router.post('/log', logController.addLog);

// GET route to retrieve logs for a user
router.get('/logs/:user_id', logController.getLogs);

module.exports = router;

router.post("/", (req, res) => {
    const { date, mood, anxiety, sleep, activity, social, stress, symptoms } = req.body;
    const userId = req.user ? req.user.googleId : null;  // Fetch userId from session

    if (!userId) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const query = `
        INSERT INTO logs (userId, date, mood, anxiety, sleep, activity, social, stress, symptoms)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [userId, date, mood, anxiety, sleep, activity, social, stress, symptoms], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.get("/", (req, res) => {
    const userId = req.user ? req.user.googleId : null;

    if (!userId) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const query = "SELECT * FROM logs WHERE userId = ? ORDER BY date DESC";
    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
