import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const trainingStepMetrics = await cohere.finetuning.listTrainingStepMetrics(
    'test-finetuned-model-id'
  );

  console.log(trainingStepMetrics);
})();
