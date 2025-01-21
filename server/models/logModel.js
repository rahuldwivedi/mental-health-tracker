const db = require('../db/db');

const LogModel = {
  createLog: (data, callback) => {
    const stmt = db.prepare(`
      INSERT INTO logs (user_id, date, mood_rating, anxiety_level, sleep_hours)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(data.user_id, data.date, data.mood_rating, data.anxiety_level, data.sleep_hours, callback);
    stmt.finalize();
  },
  
  getLogsByUser: (user_id, callback) => {
    db.all(
      `SELECT date, mood_rating, anxiety_level, sleep_hours FROM logs WHERE user_id = ? ORDER BY date ASC`,
      [user_id],
      callback
    );
  }
};

module.exports = LogModel;
