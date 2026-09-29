import cohere

co = cohere.ClientV2()

text_inputs = [
    {
        "content": [
            {"type": "text", "text": "hello"},
            {"type": "text", "text": "goodbye"}
        ]
    },
]

response = co.embed(
    inputs=text_inputs,
    model="embed-v5.0-fast",
    input_type="search_document",
    embedding_types=["float"],
)
print(response)
