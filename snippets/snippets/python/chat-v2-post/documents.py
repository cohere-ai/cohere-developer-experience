import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat(
    model="command-r-plus",
    messages=[
        {
            "role": "user",
            "content": "Who's the best?",
            "documents": [{'id': '1', 'title': 'The best', 'text': 'Cohere is the best!'}]
        }
    ]
)

print(response)
