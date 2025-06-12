import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const finetunedModel = await cohere.finetuning.getFinetunedModel('test-id');

  console.log(finetunedModel);
})();
