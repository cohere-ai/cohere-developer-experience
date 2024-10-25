const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  
});

(async () => {
  const connectors = await cohere.connectors.list();

  console.log(connectors);
})();
