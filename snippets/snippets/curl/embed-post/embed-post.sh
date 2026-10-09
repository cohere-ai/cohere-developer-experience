curl --request POST \
  --url https://api.cohere.com/v1/embed \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "embed-v5.0-fast",
    "texts": ["hello", "goodbye"],
    "input_type": "search_document"
  }'
