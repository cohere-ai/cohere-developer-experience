import cohere

co = cohere.Client("<<apiKey>>")
response = co.finetuning.get_finetuned_model("test-id")
print(response)
