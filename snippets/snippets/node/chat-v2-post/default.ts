const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: '<<apiKey>>',
});

(async () => {
  const response = await cohere.chat({
    model: 'command-r-plus-08-2024',
    messages: [
      {
        role: 'user',
        content: 'hello world!',
      },
    ],
  });

  console.log(response);
})();
