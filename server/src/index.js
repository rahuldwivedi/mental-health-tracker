const express = require('express');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const logRouter = require('./routes/logs');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/api/', logRouter);
app.use('/api/', authRouter);