import cohere

co = cohere.Client("<<apiKey>>")
co.connectors.delete("test-id")
