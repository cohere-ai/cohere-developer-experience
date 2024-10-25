import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  const usage = await cohere.datasets.getUsage('id');

  console.log(usage);
})();
