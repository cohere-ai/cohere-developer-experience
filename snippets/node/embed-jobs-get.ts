const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const embedJobs = await cohere.embedJobs.list();

  console.log(embedJobs);
})();
