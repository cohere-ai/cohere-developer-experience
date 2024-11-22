import cohere

co = cohere.Client("<<apiKey>>")
response = co.connectors.get("test-id")
print(response)
