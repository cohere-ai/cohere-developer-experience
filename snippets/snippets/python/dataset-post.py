import cohere

co = cohere.Client("<<apiKey>>")

# upload a dataset
my_dataset = co.datasets.create(
    name="prompt-completion-dataset",
    data=open("./prompt-completion.jsonl", "rb"),
    type="prompt-completion-finetune-input",
)

# wait for validation to complete
response = co.wait(my_dataset)

print(response)
