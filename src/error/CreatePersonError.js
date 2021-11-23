class CreatePersonError extends Error {
  constructor(message) {
    super(message);
    this.name = "CreatePersonError";
    this.message = message;
  }
}

module.exports = CreatePersonError;
