const { Cohere, CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

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
