curl --request POST \
  --url https://api.cohere.com/v2/embed \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "embed-english-v3.0",
    "texts": ["hello", "goodbye"],
    "input_type": "classification",
    "embedding_types": ["float"]
  }'