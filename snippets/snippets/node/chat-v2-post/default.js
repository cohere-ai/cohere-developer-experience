const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({});

(async () => {
  const response = await cohere.chat({
    model: 'command-a-plus-05-2026',
    messages: [
      {
        role: 'user',
        content: 'Tell me about LLMs',
      },
    ],
  });

  console.log(response);
})();
