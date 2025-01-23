const generateToken = require('../utils/tokenUtils');
const db = require('../config/db');

const authController = {
  registerUser: (req, res) => {
    const { googleId, name, email } = req.body;

    if (!googleId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const insertQuery = `
      INSERT INTO users (googleId, name, email)
      VALUES (?, ?, ?)
    `;

    db.run(insertQuery, [googleId, name, email], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const token = generateToken(googleId);
      res.status(201).json({ id: googleId, token, email, name });
    });
  }
};

module.exports = authController;
