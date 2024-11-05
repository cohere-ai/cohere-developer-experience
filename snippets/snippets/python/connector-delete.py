import cohere

co = cohere.Client()
co.connectors.delete("test-id")
