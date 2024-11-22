import cohere

co = cohere.Client("<<apiKey>>")

# get embed job
response = co.embed_jobs.get("job_id")

print(response)
