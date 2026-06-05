curl --request POST \
  --url https://api.cohere.com/v2/batches/v2/batches \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: Bearer $CO_API_KEY" \
  --data '{
          "name": "<batch_job_name>",
          "input_dataset_id": "<dataset_id>",
          "model": "<model_name>"
  }'