import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const events = await cohere.finetuning.listEvents('test-finetuned-model-id');

  console.log(events);
})();
