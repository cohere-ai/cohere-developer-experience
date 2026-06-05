curl --request POST \
  --url https://api.cohere.com/v1/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "command-a-03-2025",
    "stream": true,
    "message": "Tell me about LLMs"
  }'