const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const finetunedModel = await cohere.finetuning.updateFinetunedModel('test-id', {
    name: 'new name',
  });

  console.log(finetunedModel);
})();
