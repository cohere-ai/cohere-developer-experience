import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.connectors.o_auth_authorize(
        connector_id="test-id", after_token_redirect="https://test.com"
    )
    print(response)

asyncio.run(main())
