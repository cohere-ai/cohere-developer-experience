import cohere

co = cohere.Client("<<apiKey>>")
co.finetuning.delete_finetuned_model("test-id")
