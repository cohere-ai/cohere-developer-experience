import cohere

co = cohere.Client("<<apiKey>>")
train_step_metrics = co.finetuning.list_training_step_metrics(
    finetuned_model_id="test-id")
print(train_step_metrics)
