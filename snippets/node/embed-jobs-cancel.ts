const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const embedJob = await cohere.embedJobs.cancel('job_id');

  console.log(embedJob);
})();
