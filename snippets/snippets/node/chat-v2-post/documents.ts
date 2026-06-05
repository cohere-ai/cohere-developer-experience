const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({});

(async () => {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    documents: [{ id: '1', data: 'Cohere is the best!' }],
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: "Who's the best?" }],
      },
    ],
  });

  console.log(response);
})();
