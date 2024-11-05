import cohere

co = cohere.Client()
response = co.finetuning.list_events(finetuned_model_id="test-id")
print(response)
