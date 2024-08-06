curl --request DELETE \
  --url https://api.cohere.com/v1/datasets/id \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY"