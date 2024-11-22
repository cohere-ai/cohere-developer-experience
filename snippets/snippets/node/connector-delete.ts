const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  await cohere.connectors.delete('connector-id');
})();
