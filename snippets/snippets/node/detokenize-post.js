import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const detokenize = await cohere.detokenize({
    tokens: [10002, 2261, 2012, 8, 2792, 43],
    model: 'command',
  });

  console.log(detokenize);
})();
