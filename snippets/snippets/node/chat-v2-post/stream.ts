const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({});

(async () => {
  const stream = await cohere.chatStream({
    model: 'command-r-plus-08-2024',
    messages: [
      {
        role: 'user',
        content: 'hello world!',
      },
    ],
  });

  for await (const chatEvent of stream) {
    if (chatEvent.type === 'content-delta') {
      console.log(chatEvent.delta?.message);
    }
  }
})();
