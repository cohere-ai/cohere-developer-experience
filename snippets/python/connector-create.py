import cohere

co = cohere.Client("<<apiKey>>")
response = co.connectors.create(
    name="Example connector",
    url="https://connector-example.com/search",
)
print(response)
