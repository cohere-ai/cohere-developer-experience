import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const batches = await cohere.batches.list();
  console.log(batches);
})();
