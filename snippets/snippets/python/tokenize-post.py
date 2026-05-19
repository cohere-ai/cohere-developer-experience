import cohere

co = cohere.Client()

response = co.tokenize(
    text="tokenize me! :D", model="command-a-plus-05-2026"
)  # optional
print(response)
