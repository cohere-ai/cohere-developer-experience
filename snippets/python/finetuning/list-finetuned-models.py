import cohere

co = cohere.Client("<<apiKey>>")
response = co.finetuning.list_finetuned_models()
print(response)
