const cohere = require('cohere-ai');
cohere.init('<<apiKey>>')(async () => {
  const response = await cohere.tokenize({
    text: 'tokenize me! :D',
    model: 'command', // optional
  });
  console.log(response);
})();
