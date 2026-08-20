import cohere

co = cohere.ClientV2()

response = co.parse(
    model="parse-v5.0",
    document={
        "type": "image_url",
        "image_url": "https://cohere.com/favicon-32x32.png",
    },
    output_format="markdown",
)

print(response)
