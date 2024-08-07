const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const events = await cohere.finetuning.listEvents('test-finetuned-model-id');

  console.log(events);
})();
