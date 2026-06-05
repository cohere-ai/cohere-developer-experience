import cohere

co = cohere.ClientV2()

batch_job = co.batches.create(
    name="<batch_job_name>",
    input_dataset_id="<input_dataset_id>",
    model="<model_name>",
)
