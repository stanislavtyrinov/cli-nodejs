const mappings = require('../mappings');

/**
 * Normalizes given content.
 *
 * @param {Object[]} content
 * @param {string} mapping
 *
 * @returns {Object[]} Normalized content
 */
function normalizeContent(content, mapping) {
  const normalizedContent = content.map((el) => {
    const normalizedEntity = {};
    // Map fields.
    Object.entries(mappings[mapping]).forEach(([key, value]) => {
      normalizedEntity[key] = el[value];
    });
    return normalizedEntity;
  });

  return normalizedContent;
}

module.exports = {
  normalizeContent
};
