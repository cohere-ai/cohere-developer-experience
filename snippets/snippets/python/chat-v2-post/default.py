import cohere

co = cohere.ClientV2()

response = co.chat(
    model="command-a-03-2025",
    messages=[{"role": "user", "content": "hello world!"}],
)

print(response)
