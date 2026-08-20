import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const response = await cohere.v2.parse({
    model: 'parse-v5.0',
    document: {
      type: 'image_url',
      imageUrl: 'https://cohere.com/favicon-32x32.png',
    },
    outputFormat: 'blocks',
  });
  console.log(response);
})();
