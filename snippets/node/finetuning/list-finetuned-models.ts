const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const finetunedModels = await cohere.finetuning.listFinetunedModels();

  console.log(finetunedModels);
})();
