curl --request PATCH \
  --url https://api.cohere.com/v1/finetuning/finetuned-models/test-id \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{ "name": "new name" }'
