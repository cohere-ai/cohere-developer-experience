const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const finetunedModels = await cohere.finetuning.listFinetunedModels();

  console.log(finetunedModels);
})();
