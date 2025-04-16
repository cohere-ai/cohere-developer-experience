const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const connector = await cohere.connectors.oAuthAuthorize('connector-id', {
    redirect_uri: 'https://example.com/oauth/callback',
  });

  console.log(connector);
})();
