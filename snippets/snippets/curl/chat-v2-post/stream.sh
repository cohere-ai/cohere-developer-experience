curl --request POST \
  --url https://api.cohere.com/v2/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "stream": true,
    "model": "command-a-03-2025",
    "messages": [
      {
        "role": "user",
        "content": "Hello world!"
      }
    ]
  }'
