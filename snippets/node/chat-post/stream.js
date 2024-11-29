import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  
});

(async () => {
  const chatStream = await cohere.chatStream({
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

  for await (const message of chatStream) {
    if (message.eventType === 'text-generation') {
      process.stdout.write(message);
    }
  }
})();
