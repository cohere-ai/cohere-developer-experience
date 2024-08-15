import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat(
    model="command-r-plus",
    messages=[
        cohere.v2.ChatMessage2_User(
            content=[
                cohere.v2.DocumentContent(
                    id=1,
                    document={'title': 'The best',
                              'text': 'Cohere is the best!'}
                ),
                cohere.v2.TextContent(text="Who's the best?"),
            ]
        )
    ]
)

print(response)
