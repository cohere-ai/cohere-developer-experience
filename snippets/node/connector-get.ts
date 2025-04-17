const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const connector = await cohere.connectors.get('connector-id');

  console.log(connector);
})();
