import cohere

co = cohere.Client()

# get embed job
response = co.embed_jobs.get("job_id")

print(response)
