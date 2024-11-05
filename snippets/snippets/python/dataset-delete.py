import cohere

co = cohere.Client()

# delete dataset
co.datasets.delete("id")
