const axios = require('axios');
const config = require('config');
const HttpError = require('../errors/http_error');

/**
 * Retrieves content from the given source by content type.
 *
 * @param {string} source
 * @param {string} type
 *
 * @returns {Promise<*>}
 */
async function getContent(source, type) {
  const contentConfigs = config.get('content');

  try {
    const responce = await axios.get(contentConfigs[source][type].apiUrl);
    return responce.data;
  } catch (err) {
    throw new HttpError(`Failed to retieve the content. The reason: ${err.message}`);
  }
}

module.exports = {
  getContent
};
