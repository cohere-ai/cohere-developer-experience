import cohere

co = cohere.Client("<<apiKey>>")
response = co.finetuning.list_events(finetuned_model_id="test-id")
print(response)
