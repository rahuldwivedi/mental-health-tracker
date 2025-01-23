const LogModel = require('../models/logModel');
const logController = {
  addLog: (req, res) => {
    const logData = req.body;

    LogModel.createLog(logData, (error) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ 
        message: 'Log saved successfully', 
        data: logData 
      });
    });
  },

  getLogs: (req, res) => {
    const userId = req.params.userId;

    LogModel.getLogsByUser(userId, (error, logs) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json(logs);
    });
  }
};

module.exports = logController;
