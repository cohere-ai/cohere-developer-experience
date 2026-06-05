curl --request POST \
  --url https://api.cohere.com/v2/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "stream": true,
    "model": "command-a-vision-07-2025",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Describe the logo in this image"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://cohere.com/favicon-32x32.png",
              "detail": "auto"
            }
          }
        ]
      }
    ]
  }'
