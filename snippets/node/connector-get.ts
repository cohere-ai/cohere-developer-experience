const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const connector = await cohere.connectors.get('connector-id');

  console.log(connector);
})();
