import cohere

co = cohere.Client()

# cancel an embed job
co.embed_jobs.cancel("job_id")
