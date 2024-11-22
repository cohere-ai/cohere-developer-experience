import cohere

co = cohere.Client()
co.finetuning.delete_finetuned_model("test-id")
