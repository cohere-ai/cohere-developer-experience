import cohere

co = cohere.ClientV2()

batch_job = co.batches.cancel("<batch_job_id>")