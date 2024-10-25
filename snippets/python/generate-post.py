import cohere

co = cohere.Client()

response = co.generate(
    prompt="Please explain to me how LLMs work",
)
print(response)
