curl --request POST \
  --url https://api.cohere.com/v2/parse \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "parse-v5.0",
    "document": {
      "type": "image_url",
      "image_url": "https://cohere.com/favicon-32x32.png"
    },
    "output_format": "markdown"
  }'
