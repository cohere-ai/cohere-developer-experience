import cohere

co = cohere.ClientV2()

response = co.chat_stream(
    model="command-r-plus-08-2024",
    messages=[
        {
            "role": "user",
            "content": "hello world!"
        }
    ]
)

for event in response:
    if event.type == "content-delta":
        print(event.delta.message.content.text, end='')
