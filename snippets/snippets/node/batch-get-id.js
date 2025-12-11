import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const batchJob = await cohere.batches.retrieve('<batch_job_id>');
  console.log(batchJob);
})();
