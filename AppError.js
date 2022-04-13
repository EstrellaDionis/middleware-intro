class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message; //this is the message that we input
    this.status = status; //this is how express will automatically look for status code for us
  }
}

module.exports = AppError;
