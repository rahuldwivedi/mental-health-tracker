const db = require('../config/db');

const LogModel = {
  createLog: (data, callback) => {
    const stmt = db.prepare(`
      INSERT INTO logs (userId, date, mood, anxiety, sleep, activity, social, stress)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(data.userId, data.date, data.mood, data.anxiety, data.sleep, data.activity, 
      data.social, data.stress, callback);
    stmt.finalize();
  },
  
  getLogsByUser: (userId, callback) => {
    db.all(
      `SELECT mood, anxiety, sleep FROM logs WHERE userId = ? ORDER BY date ASC`,
      [userId],
      callback
    );
  }
};


module.exports = LogModel;
