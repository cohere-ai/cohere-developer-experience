import cohere

co = cohere.Client()

# list embed jobs
response = co.embed_jobs.list()

print(response)
