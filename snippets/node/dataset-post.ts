const { CohereClient } = require('cohere-ai');
const fs = require('fs');

const cohere = new CohereClient({
  token: '<<apiKey>>',
});

(async () => {
  const file = fs.createReadStream('embed_jobs_sample_data.jsonl'); // {"text": "The quick brown fox jumps over the lazy dog"}

  const dataset = await cohere.datasets.create({ name: 'my-dataset', type: 'embed-input' }, file);

  console.log(dataset);
})();
