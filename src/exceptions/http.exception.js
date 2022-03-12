class HttpException extends Error {
  constructor(status, message, timestamp, path) {
    super(message, timestamp, path);
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
    this.path = path;
  }
}
module.exports = HttpException;
