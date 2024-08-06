curl --request POST \
  --url https://api.cohere.com/v1/connectors/id/oauth/authorize \
  --header 'accept: application/json' \
  --header "Authorization: bearer $CO_API_KEY"