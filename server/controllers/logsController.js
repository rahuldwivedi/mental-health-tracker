const logController = {
  addLog: (req, res) => {
    const { user_id, date, mood_rating, anxiety_level, sleep_hours } = req.body;

    LogModel.createLog(
      { user_id, date, mood_rating, anxiety_level, sleep_hours },
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Log saved successfully' });
      }
    );
  },

  getLogs: (req, res) => {
    const { user_id } = req.params;
    
    LogModel.getLogsByUser(user_id, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(rows);
    });
  }
};

module.exports = logController;
