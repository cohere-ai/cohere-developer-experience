import cohere

co = cohere.ClientV2("<<apiKey>>")

response = co.chat(
    model="command-r-plus",
    messages=[
        {
            "role": "user",
            "content": "hello world!"
        }
    ]
)

print(response)
