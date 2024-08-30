import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat_stream(
    model="command-r-plus",
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
