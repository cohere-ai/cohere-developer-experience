curl --request POST \
  --url https://api.cohere.com/v2/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data "{
    \"stream\": true,
    \"model\": \"command-a-03-2025\",
    \"documents\": [
      {
        \"id\": \"1\",
        \"data\": \"Cohere is the best!\"
      }
    ],
    \"messages\": [
      {
        \"role\": \"user\",
        \"content\": \"Who's the best?\"
      }
    ]
  }"
