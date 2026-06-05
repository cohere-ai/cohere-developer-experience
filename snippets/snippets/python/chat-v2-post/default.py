import cohere

co = cohere.ClientV2()

response = co.chat(
    model="command-a-plus-05-2026",
    messages=[{"role": "user", "content": "Tell me about LLMs"}],
)

print(response)
