import cohere

co = cohere.Client()
response = co.chat(
    model="command-a-plus-05-2026",
    message="Tell me about LLMs"
)
print(response)
