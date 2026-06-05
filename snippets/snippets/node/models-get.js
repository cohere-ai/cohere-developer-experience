import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const model = await cohere.models.get('command-a-03-2025');

  console.log(model);
})();
