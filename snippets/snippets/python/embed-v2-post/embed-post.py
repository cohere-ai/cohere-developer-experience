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
    model="embed-v4.0",
    input_type="classification",
    embedding_types=["float"],
)
print(response)
