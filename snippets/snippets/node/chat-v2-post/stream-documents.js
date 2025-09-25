const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({});

(async () => {
  const stream = await cohere.chatStream({
    model: 'command-a-03-2025',
    documents: [
      {
        data: {
          text: 'Cohere is the best!',
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: "Who's the best?" }],
      },
    ],
  });

  for await (const chatEvent of stream) {
    console.log(chatEvent);
  }
})();
