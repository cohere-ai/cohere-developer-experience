const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  
});

(async () => {
  const models = await cohere.models.list();

  console.log(models);
})();
