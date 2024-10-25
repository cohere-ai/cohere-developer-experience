import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  const embedJobs = await cohere.embedJobs.list();

  console.log(embedJobs);
})();
