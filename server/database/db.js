const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mental_health.db', (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Create Logs table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      date TEXT,
      mood INTEGER,
      anxiety INTEGER,
      sleep REAL,
      activity TEXT,
      social INTEGER,
      stress INTEGER,
      symptoms TEXT
    )
  `);
});

db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          googleId TEXT,
          name TEXT,
          email TEXT
      )
  `);
});

module.exports = db;
