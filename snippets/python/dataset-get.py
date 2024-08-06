import cohere

co = cohere.Client("<<apiKey>>")

# get dataset
response = co.datasets.get(id="<<datasetId>>")

print(response)
