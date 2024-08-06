import cohere

co = cohere.Client("<<apiKey>>")

# cancel an embed job
co.embed_jobs.cancel("job_id")
