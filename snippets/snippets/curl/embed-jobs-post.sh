curl --request POST \
  --url https://api.cohere.com/v1/embed-jobs \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "embed-english-v3.0",
    "dataset_id": "my-dataset"
  }'