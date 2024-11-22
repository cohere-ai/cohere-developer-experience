import cohere

co = cohere.Client("<<apiKey>>")

# get usage
response = co.datasets.get_usage()

print(response)
