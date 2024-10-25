import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  await cohere.connectors.delete('connector-id');
})();
