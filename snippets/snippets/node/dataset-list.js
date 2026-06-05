import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const datasets = await cohere.datasets.list();

  console.log(datasets);
})();
