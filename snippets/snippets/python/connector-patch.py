import cohere

co = cohere.Client()
response = co.connectors.update(
    connector_id="test-id", name="new name", url="https://example.com/search"
)
print(response)
