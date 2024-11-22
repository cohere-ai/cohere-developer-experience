const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const embedJob = await cohere.embedJobs.get('job_id');

  console.log(embedJob);
})();
