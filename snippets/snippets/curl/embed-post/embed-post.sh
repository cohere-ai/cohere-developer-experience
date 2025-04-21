curl --request POST \
  --url https://api.cohere.com/v1/embed \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "embed-v4.0",
    "texts": ["hello", "goodbye"],
    "input_type": "classification"
  }'
