require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

const hashRounds = parseInt(process.env.HASH_ROUNDS || '10', 10);

module.exports = {
  jwtSecret,
  hashRounds,
};
