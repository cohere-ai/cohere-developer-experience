import cohere

co = cohere.Client("<<apiKey>>")

# list embed jobs
response = co.embed_jobs.list()

print(response)
