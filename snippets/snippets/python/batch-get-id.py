import cohere

co = cohere.ClientV2()

batch_job = co.batches.retrieve("<batch_job_id>")