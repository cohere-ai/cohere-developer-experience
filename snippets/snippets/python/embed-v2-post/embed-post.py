import cohere

co = cohere.ClientV2()

response = co.embed(
    texts=["hello", "goodbye"],
    model="embed-v4.0",
    input_type="classification",
    embedding_types=["float"],
)
print(response)
