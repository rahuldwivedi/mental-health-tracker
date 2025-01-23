const { verify } = require('jsonwebtoken');
const HttpError = require('../utils/httpError');

const authMiddleware = (req, _res, next) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;

  if (!token) {
    return next(new HttpError(401, 'Authentication failed: token missing'));
  }

  try {
    const decodedToken = verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(new HttpError(401, 'Authentication failed: invalid token'));
  }
};

module.exports = authMiddleware;
