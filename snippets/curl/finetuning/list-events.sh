curl --request GET \
  --url https://api.cohere.com/v1/finetuning/finetuned-models/test-id/events \
  --header 'accept: application/json' \
  --header "Authorization: bearer $CO_API_KEY"