import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    message: 'Tell me about LLMs',
  });

  console.log(response);
})();
