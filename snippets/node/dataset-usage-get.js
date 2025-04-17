import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const usage = await cohere.datasets.getUsage('id');

  console.log(usage);
})();
