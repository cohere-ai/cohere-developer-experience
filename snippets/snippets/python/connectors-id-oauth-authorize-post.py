import cohere

co = cohere.Client()
response = co.connectors.o_auth_authorize(
    connector_id="test-id", after_token_redirect="https://test.com"
)
print(response)
