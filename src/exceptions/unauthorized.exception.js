const HttpException = require('./index');

class UnauthorizedException extends HttpException {
  constructor(message = 'authorized', timestamp = new Date().now()) {
    super(401, message, timestamp);
  }
}

module.exports = UnauthorizedException;
