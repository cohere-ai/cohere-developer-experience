const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  
});

(async () => {
  const embed = await cohere.embed({
    texts: ['hello', 'goodbye'],
    model: 'embed-english-v3.0',
    inputType: 'classification',
    embeddingTypes: ['float'],
  });
  console.log(embed);
})();