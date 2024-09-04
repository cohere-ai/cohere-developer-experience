curl --request POST \
  --url https://api.cohere.com/v1/finetuning/finetuned-models \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
      "name": "test-finetuned-model",
      "settings": {
        "base_model": {
          "base_type": "BASE_TYPE_GENERATIVE",
        },
        "dataset_id": "test-dataset-id"
      }
  }'
