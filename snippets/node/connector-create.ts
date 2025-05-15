const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const connector = await cohere.connectors.create({
    name: 'test-connector',
    url: 'https://example.com/search',
    description: 'A test connector',
  });

  console.log(connector);
})();
