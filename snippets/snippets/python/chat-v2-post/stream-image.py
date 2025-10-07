import cohere

co = cohere.ClientV2()

response = co.chat_stream(
    model="command-a-vision-07-2025",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image"
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

for event in response:
    if event.type == "content-delta":
        print(event.delta.message.content.text, end="")