import cohere

co = cohere.Client()
response = co.chat(
    model="command-a-03-2025",
    message="Tell me about LLMs"
)
print(response)
