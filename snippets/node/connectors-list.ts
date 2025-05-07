const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const connectors = await cohere.connectors.list();

  console.log(connectors);
})();
