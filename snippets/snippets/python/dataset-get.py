import cohere

co = cohere.Client()

# get dataset
response = co.datasets.get(id="<<datasetId>>")

print(response)
