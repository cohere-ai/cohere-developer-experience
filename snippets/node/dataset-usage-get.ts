const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const usage = await cohere.datasets.getUsage('id');

  console.log(usage);
})();
