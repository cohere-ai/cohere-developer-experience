import cohere

co = cohere.ClientV2()

response = co.chat_stream(
    model="command-a-plus-05-2026",
    messages=[{"role": "user", "content": "Tell me about LLMs"}],
)

for event in response:
    if event.type == "content-delta":
        print(event.delta.message.content.text, end="")
