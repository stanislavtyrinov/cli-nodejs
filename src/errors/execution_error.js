/**
 * @class ExecutionError
 */
class ExecutionError extends Error {
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
      Error.captureStackTrace(this, ExecutionError);
    }
  }
}

module.exports = ExecutionError;
