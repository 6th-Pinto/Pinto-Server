const HttpException = require('./http.exception');

class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden', timestamp = new Date().now()) {
    super(403, message, timestamp);
  }
}

module.exports = ForbiddenException;
