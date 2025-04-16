import { Cohere, CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

(async () => {
  const finetunedModel = await cohere.finetuning.createFinetunedModel({
    name: 'test-finetuned-model',
    settings: {
      base_model: {
        base_type: Cohere.Finetuning.BaseType.BaseTypeChat,
      },
      dataset_id: 'test-dataset-id',
    },
  });

  console.log(finetunedModel);
})();
