import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const finetunedModels = await cohere.finetuning.listFinetunedModels();

  console.log(finetunedModels);
})();
