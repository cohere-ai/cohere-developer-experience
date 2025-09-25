import cohere

co = cohere.ClientV2()

response = co.chat_stream(
    model="command-a-03-2025",
    documents=[
        {"id": "1", "data": {"text": "Cohere is the best!", "title": "The best"}}
    ],
    messages=[{"role": "user", "content": "Who's the best?"}],
)

for event in response:
    if event.type == "message-start":
        print("\nMessage started.")
    elif event.type == "message-end":
        print("\nMessage ended.")
    elif event.type == "content-delta":
        print(event.delta.message.content.text, end="")

