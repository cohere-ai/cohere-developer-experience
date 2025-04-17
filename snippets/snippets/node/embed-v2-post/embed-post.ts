const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const embed = await cohere.v2.embed({
    texts: ['hello', 'goodbye'],
    model: 'embed-v4.0',
    inputType: 'classification',
    embeddingTypes: ['float'],
  });
  console.log(embed);
})();
