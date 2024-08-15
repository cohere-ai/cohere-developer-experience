import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat_stream(
    model="command-r-plus",
    messages=[
        cohere.v2.ChatMessage2_User(
            content="hello world!"
        )
    ]
)

for event in response:
    if event.event_type == "text-generation":
        print(event.text, end='')
