const ExecutionError = require('./execution_error');

/**
 * @class ValidationError
 */
class ValidationError extends ExecutionError {
  /**
   * Class constructor
   *
   * @param {...*} params
   */
  constructor(...params) {
    // Passes arguments to the parent constructor
    super(...params);

    this.name = this.constructor.name;

    // Maintains proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

module.exports = ValidationError;
