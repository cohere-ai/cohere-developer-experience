const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const usage = await cohere.datasets.getUsage('id');

  console.log(usage);
})();
