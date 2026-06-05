import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const batchJob = await cohere.batches.create({
    name: '<my_job_name>',
    inputDatasetId: '<input_dataset_id>',
    model: '<model_name>',
  });

  console.log(batchJob);
})();
