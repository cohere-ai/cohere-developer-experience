import cohere

co = cohere.Client()

# upload a dataset
my_dataset = co.datasets.create(
    name="embed-dataset",
    data=open("./embed.jsonl", "rb"),
    type="embed-input",
)

# wait for validation to complete
response = co.wait(my_dataset)

print(response)
