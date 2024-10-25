import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  const embedJob = await cohere.embedJobs.create({
    datasetId: 'my-dataset',
    inputType: 'search_document',
    model: 'embed-english-v3.0',
  });

  console.log(embedJob);
})();
