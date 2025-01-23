const sqlite3 = require('sqlite3').verbose();  // Enable verbose mode for logging

// Open SQLite database
const db = new sqlite3.Database('./mental_health.db', (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('SQLite database opened');
    }
  }
});

// Enable logging by intercepting all queries and logging them
if (process.env.NODE_ENV === 'development') {
  db.on('trace', (sql) => {
    console.log('Executed SQL: ', sql); // Log every SQL query that gets executed
  });
}

// Create Logs table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      mood INTEGER,
      anxiety INTEGER,
      sleep INTEGER,
      activity TEXT,
      social TEXT,
      stress INTEGER,
      symptoms TEXT,
      userId TEXT
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
