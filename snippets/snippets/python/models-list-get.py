import cohere

co = cohere.Client("<<apiKey>>")
response = co.models.list()
print(response)
