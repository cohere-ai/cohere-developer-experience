import cohere

co = cohere.Client()
response = co.finetuning.list_finetuned_models()
print(response)
