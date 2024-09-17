import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat(
    model="command-r-plus",
    documents=[{'id': '1', 'data': {'text': 'Cohere is the best!', 'title': 'The best'}}],
    messages=[
        {
            "role": "user",
            "content": "Who's the best?"
        }
    ]
)

print(response)
