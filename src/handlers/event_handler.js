const config = require('config');
const { getContent } = require('../helpers/http_helper');
const { normalizeContent } = require('../helpers/normalization_helper');
const { sendMessage } = require('../helpers/sqs_helper');

/**
 * Handler for the sync command.
 *
 * @param {Object[]} argv
 *
 * @returns {void}
 */
async function handleSyncEvent(argv) {
  const { source, type } = argv;
  const contentConfigs = config.get('content');
  try {
    // Get content.
    const content = await getContent(source, type);
    // Map content.
    const normalizedContent = normalizeContent(content.results, contentConfigs[source][type].mapping);
    // Send content.
    const message = JSON.stringify({
      data: normalizedContent,
      source,
      type
    });
    await sendMessage(message);

    console.log('The content was successfully synced.');
  } catch (err) {
    console.log(`Execution error. Reason: ${err.message}`);
  }
}

module.exports = {
  handleSyncEvent
};
