import cohere

co = cohere.Client("<<apiKey>>")

# upload a dataset
my_dataset = co.datasets.create(
    name="chat-dataset",
    data=open("./chat.jsonl", "rb"),
    type="chat-finetune-input",
)

# wait for validation to complete
response = co.wait(my_dataset)

print(response)
