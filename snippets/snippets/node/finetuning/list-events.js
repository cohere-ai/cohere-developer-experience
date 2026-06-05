import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const events = await cohere.finetuning.listEvents('test-finetuned-model-id');

  console.log(events);
})();
