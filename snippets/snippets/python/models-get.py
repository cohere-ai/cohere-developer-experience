from cohere import Client

client = Client()

response = client.models.get(
    model="command-a-plus-05-2026",
)
print(response)
