import cohere

co = cohere.Client()

response = co.detokenize(
    tokens=[8466, 5169, 2594, 8, 2792, 43], model="command-r-plus-08-2024"  # optional
)
print(response)
