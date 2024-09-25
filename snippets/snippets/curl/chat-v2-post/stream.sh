curl --request POST \
  --url https://api.cohere.com/v1/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "stream": true,
    "model": "command-r-plus",
    "messages": [
      {
        "role": "user",
        "message": "Hello world!"
      }
    ],
  }'