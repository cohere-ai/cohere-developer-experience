const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const connectors = await cohere.connectors.list();

  console.log(connectors);
})();
