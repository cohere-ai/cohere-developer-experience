import cohere

co = cohere.Client()

# start an embed job
job = co.embed_jobs.create(
    dataset_id="my-dataset-id", input_type="search_document", model="embed-english-v3.0"
)

# poll the server until the job is complete
response = co.wait(job)

print(response)
