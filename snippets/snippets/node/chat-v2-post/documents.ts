const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: '<<apiKey>>',
});

(async () => {
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: "Who's the best?" }],
        documents: [{ id: '1', text: 'Cohere is the best!' }],
      },
    ],
  });

  console.log(response);
})();
