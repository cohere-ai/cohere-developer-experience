import cohere

co = cohere.Client("<<apiKey>>")

# delete dataset
co.datasets.delete("id")
