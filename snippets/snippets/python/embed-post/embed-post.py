import cohere

co = cohere.Client()

response = co.embed(
    texts=["hello", "goodbye"], model="embed-english-v3.0", input_type="classification"
)
print(response)
