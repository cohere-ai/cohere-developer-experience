curl --request POST \
  --url https://api.cohere.com/v1/generate \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "prompt": "Please explain to me how LLMs work"
  }'