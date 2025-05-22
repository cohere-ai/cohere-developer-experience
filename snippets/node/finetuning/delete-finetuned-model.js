import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  await cohere.finetuning.deleteFinetunedModel('test-id');
})();
