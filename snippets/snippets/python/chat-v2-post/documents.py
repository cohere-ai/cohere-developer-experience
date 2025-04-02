import cohere

co = cohere.ClientV2()

response = co.chat(
    model="command-a-03-2025",
    documents=[
        {"id": "1", "data": {"text": "Cohere is the best!", "title": "The best"}}
    ],
    messages=[{"role": "user", "content": "Who's the best?"}],
)

print(response)
