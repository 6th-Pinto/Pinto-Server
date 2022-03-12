const UnauthorizedException = require('../exceptions');
const verify = require('../lib/jwt');

export function verifyJWT(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    try {
      const token = bearerToken.replace(/^Bearer /, '');
      const decoded = verify(token);

      next();
    } catch (err) {
      next(new UnauthorizedException());
    }
  } else {
    next();
  }
}
