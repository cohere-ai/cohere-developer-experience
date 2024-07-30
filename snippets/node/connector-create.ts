const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const connector = await cohere.connectors.create({
    name: 'test-connector',
    url: 'https://example.com/search',
    description: 'A test connector',
  });

  console.log(connector);
})();
