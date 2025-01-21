import cohere

co = cohere.Client()

# get usage
response = co.datasets.get_usage()

print(response)
