const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  
});

(async () => {
  const embed = await cohere.v2.embed({
    texts: ['hello', 'goodbye'],
    model: 'embed-english-v3.0',
    inputType: 'classification',
  });
  console.log(embed);
})();
