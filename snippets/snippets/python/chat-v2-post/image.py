import cohere

co = cohere.ClientV2()

response = co.chat(
    model="command-a-vision-07-2025",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe the logo!"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        # Can be either a base64 data URI or a web URL.
                        "url": "https://cohere.com/favicon-32x32.png",
                        "detail": "auto"
                    }
                }
            ]
            
        }
    ]
)

print(response)