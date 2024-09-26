curl --request POST \
  --url https://api.cohere.com/v1/tokenize \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "command-r-plus",
    "text": "tokenize me! :D"
  }'