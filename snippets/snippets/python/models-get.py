from cohere import Client

client = Client()

response = client.models.get(
    model="command-a-03-2025",
)
print(response)
