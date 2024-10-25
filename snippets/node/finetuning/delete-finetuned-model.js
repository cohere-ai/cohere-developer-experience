import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  await cohere.finetuning.deleteFinetunedModel('test-id');
})();
