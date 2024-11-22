import cohere

co = cohere.Client()
response = co.connectors.list()
print(response)
