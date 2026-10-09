import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const embed = await cohere.v2.embed({
    texts: ['hello', 'goodbye'],
    model: 'embed-v5.0-fast',
    inputType: 'search_document',
    embeddingTypes: ['float'],
  });
  console.log(embed);
})();
