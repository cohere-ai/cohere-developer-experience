import cohere

co = cohere.Client()
response = co.connectors.get("test-id")
print(response)
