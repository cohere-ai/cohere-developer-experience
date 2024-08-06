const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const embedJob = await cohere.embedJobs.create({
    datasetId: 'my-dataset',
    inputType: 'search_document',
    model: 'embed-english-v3.0',
  });

  console.log(embedJob);
})();
