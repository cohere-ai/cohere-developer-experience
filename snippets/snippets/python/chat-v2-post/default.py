import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat(
    model="command-r-plus",
    messages=[
        cohere.v2.ChatMessage2_User(
            content="hello world!"
        )
    ]
)

print(response)
