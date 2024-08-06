curl --request POST \
  --url https://api.cohere.com/v1/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "chat_history": [
      {"role": "USER", "message": "Who discovered gravity?"},
      {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
    ],
    "message": "What year was he born?",
    "connectors": [{"id": "web-search"}]
  }'