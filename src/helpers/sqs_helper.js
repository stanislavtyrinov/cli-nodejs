const config = require('config');
const { SQS } = require('aws-sdk');

/**
 * Sends message to SQS queue.
 *
 * @param {Object} message
 *
 * @returns {Promise<*>}
 */
async function sendMessage(message) {
  const { apiVersion, endpoint, queueUrl, region } = config.get('aws.sqs');
  const sqsClient = buildSQSClient({ apiVersion, endpoint, region });
  const params = {
    MessageGroupId: 'message-group-id',
    MessageBody: message,
    QueueUrl: queueUrl
  };

  return sqsClient.sendMessage(params);
}

/**
 * Creates AWS SQS client.
 *
 * @param {Object|undefined} settings Contains settings for AWS SQS client:
 *   - `apiVersion` (required);
 *   - `endpoint`   (required only if `isLocal` is truthy);
 *   - `isLocal`    (optional);
 *   - `region`     (optional).
 *
 * @returns {SQS}
 */
function buildSQSClient(settings) {
  return new SQS(settings);
}

module.exports = {
  sendMessage
};
