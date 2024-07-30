const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const response = await cohere.chat({
    chatHistory: [
      { role: 'USER', message: 'Who discovered gravity?' },
      {
        role: 'CHATBOT',
        message: 'The man who is widely credited with discovering gravity is Sir Isaac Newton',
      },
    ],
    message: 'What year was he born?',
    // perform web search before answering the question. You can also use your own custom connector.
    connectors: [{ id: 'web-search' }],
  });

  console.log(response);
})();
