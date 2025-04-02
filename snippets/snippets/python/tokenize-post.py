import cohere

co = cohere.Client()

response = co.tokenize(
    text="tokenize me! :D", model="command-a-03-2025"
)  # optional
print(response)
