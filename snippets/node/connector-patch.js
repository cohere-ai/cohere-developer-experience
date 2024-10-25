const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  
});

(async () => {
  const connector = await cohere.connectors.update(connector.id, {
    name: 'test-connector-renamed',
    description: 'A test connector renamed',
  });

  console.log(connector);
})();
