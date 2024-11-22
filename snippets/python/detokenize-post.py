import cohere

co = cohere.Client("<<apiKey>>")

response = co.detokenize(
    tokens=[8466, 5169, 2594, 8, 2792, 43], model="command"  # optional
)
print(response)
