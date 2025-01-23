class HttpError extends Error {
  static message(message) {
    throw new Error('Method not implemented.');
  }

  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

module.exports = HttpError;
