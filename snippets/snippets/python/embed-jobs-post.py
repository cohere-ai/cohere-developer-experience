import cohere

co = cohere.Client("<<apiKey>>")

# start an embed job
response = co.embed_jobs.create(
    dataset_id=ds.id, input_type="search_document", model="embed-english-v3.0"
)

# poll the server until the job is complete
response = co.wait(job)

print(response)
