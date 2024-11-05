import cohere

co = cohere.Client()
response = co.models.list()
print(response)
