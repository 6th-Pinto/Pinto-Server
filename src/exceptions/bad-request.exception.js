const HttpException = require('./http.exception');

class BadRequestException extends HttpException {
  constructor(message = 'bad request', timestamp = new Date().now()) {
    super(400, message, timestamp);
  }
}

module.exports = BadRequestException;
