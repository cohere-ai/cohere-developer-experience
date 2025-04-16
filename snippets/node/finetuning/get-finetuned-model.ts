const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const finetunedModel = await cohere.finetuning.getFinetunedModel('test-id');

  console.log(finetunedModel);
})();
