curl --request POST \
  --url https://api.cohere.com/v1/connectors \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "name": "Example connector",
    "url": "https://connector-example.com/search"
  }'