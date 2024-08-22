import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat(
    model="command-r-plus",
    messages=[
        cohere.v2.ChatMessage2_User(
            content=[
                cohere.v2.TextContent(text="Who's the best?"),
            ],
            documents=[{'id': '1', 'title': 'The best', 'text': 'Cohere is the best!'}]
        )
    ]
)

print(response)
