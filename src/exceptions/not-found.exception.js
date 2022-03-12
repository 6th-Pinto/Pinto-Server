const HttpException = require('./http.exception');

class NotFoundException extends HttpException {
  constructor(message = 'not found', timestamp = new Date().now()) {
    super(404, message, timestamp);
  }
}

module.exports = NotFoundException;
