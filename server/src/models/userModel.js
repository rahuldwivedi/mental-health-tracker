const db = require('../config/db');

const UserModel = {
  createLog: (data, callback) => {
    const stmt = db.prepare(`
      INSERT INTO users (googleId, name, email)
      VALUES (?, ?, ?)
    `);
    stmt.run(data.googleId, callback);
    stmt.finalize();
  },
};

module.exports = UserModel;
