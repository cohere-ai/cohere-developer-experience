import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const connector = await cohere.connectors.get('connector-id');

  console.log(connector);
})();
