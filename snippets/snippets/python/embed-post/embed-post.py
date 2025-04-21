import cohere

co = cohere.Client()

response = co.embed(
    texts=["hello", "goodbye"], model="embed-v4.0", input_type="classification"
)
print(response)
