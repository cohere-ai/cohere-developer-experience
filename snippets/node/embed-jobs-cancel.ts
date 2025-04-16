const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const embedJob = await cohere.embedJobs.cancel('job_id');

  console.log(embedJob);
})();
