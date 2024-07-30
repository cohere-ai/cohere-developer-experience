const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const finetunedModel = await cohere.finetuning.getFinetunedModel('test-id');

  console.log(finetunedModel);
})();
