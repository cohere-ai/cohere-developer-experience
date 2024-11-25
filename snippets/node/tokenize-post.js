import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient();

(async () => {
  const response = await cohere.tokenize({
    text: 'tokenize me! :D',
    model: 'command', // optional
  });
  
  console.log(response);
})();
