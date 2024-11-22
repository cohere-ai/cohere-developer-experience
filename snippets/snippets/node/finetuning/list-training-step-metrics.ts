const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const trainingStepMetrics = await cohere.finetuning.listTrainingStepMetrics(
    'test-finetuned-model-id'
  );

  console.log(trainingStepMetrics);
})();
