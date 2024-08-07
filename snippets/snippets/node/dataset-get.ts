const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const datasets = await cohere.datasets.get('<<datasetId>>');

  console.log(datasets);
})();
