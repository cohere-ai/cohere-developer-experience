import cohere

co = cohere.Client()
response = co.connectors.create(
    name="Example connector",
    url="https://connector-example.com/search",
)
print(response)
