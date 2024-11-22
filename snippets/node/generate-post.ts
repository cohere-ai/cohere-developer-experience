const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const generate = await cohere.generate({
    prompt: 'Please explain to me how LLMs work',
  });

  console.log(generate);
})();
