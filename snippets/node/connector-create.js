import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  const connector = await cohere.connectors.create({
    name: 'test-connector',
    url: 'https://example.com/search',
    description: 'A test connector',
  });

  console.log(connector);
})();
