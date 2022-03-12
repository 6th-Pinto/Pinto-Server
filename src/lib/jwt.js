const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config');

function sign(payload, options) {
  return jwt.sign(payload, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1d',
    ...options,
  });
}

function verify(token, options) {
  return jwt.verify(token, jwtSecret, options);
}

module.exports = {
  sign,
  verify,
};
