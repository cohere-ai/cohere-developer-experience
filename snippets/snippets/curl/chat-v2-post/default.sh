curl --request POST \
  --url https://api.cohere.com/v2/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "command-a-plus-05-2026",
    "messages": [
      {
        "role": "user",
        "content": "Tell me about LLMs"
      }
    ]
  }'
