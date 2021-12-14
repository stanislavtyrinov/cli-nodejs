const _ = require('lodash');
const config = require('config');
const ValidationError = require('../errors/validation_error');

/**
 * Validates incoming arguments.
 *
 * @param {Object} argv
 * @throws {ValidationError}
 *
 * @returns {boolean} TRUE if validation has passed
 */
function validateArgv(argv) {
  const contentConfigs = config.get('content');
  const { source, type } = argv;

  if (!_.has(contentConfigs, source)) {
    throw new ValidationError(`Source ${source} is not supported.`);
  }
  if (!_.has(contentConfigs[source], type)) {
    throw new ValidationError(`Type ${type} for the source ${source} is not supported.`);
  }

  return true;
}

module.exports = {
  validateArgv
};
