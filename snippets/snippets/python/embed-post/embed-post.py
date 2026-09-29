import cohere

co = cohere.Client()

response = co.embed(
    texts=["hello", "goodbye"], model="embed-v5.0-fast", input_type="search_document"
)
print(response)
