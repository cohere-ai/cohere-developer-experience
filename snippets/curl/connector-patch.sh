curl --request PATCH \
  --url https://api.cohere.com/v1/connectors/id \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "name": "new name",
    "url": "https://example.com/search"
  }'