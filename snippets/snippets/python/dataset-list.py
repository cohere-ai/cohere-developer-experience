import cohere

co = cohere.Client()

# get list of datasets
response = co.datasets.list()

print(response)
