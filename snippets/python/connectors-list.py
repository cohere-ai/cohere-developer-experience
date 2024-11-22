import cohere

co = cohere.Client("<<apiKey>>")
response = co.connectors.list()
print(response)
