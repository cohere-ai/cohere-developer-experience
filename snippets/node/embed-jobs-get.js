import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const embedJobs = await cohere.embedJobs.list();

  console.log(embedJobs);
})();
