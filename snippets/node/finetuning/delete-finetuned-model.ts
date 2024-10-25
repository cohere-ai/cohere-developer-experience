const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  
});

(async () => {
  await cohere.finetuning.deleteFinetunedModel('test-id');
})();
