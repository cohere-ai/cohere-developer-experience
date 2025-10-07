import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const chatStream = await cohere.chatStream({
    model: 'command-a-03-2025',
    message: 'Tell me about LLMs',
  });

  for await (const message of chatStream) {
    if (message.eventType === 'text-generation') {
      process.stdout.write(message);
    }
  }
})();
