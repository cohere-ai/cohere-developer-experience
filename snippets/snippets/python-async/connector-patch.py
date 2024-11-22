import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.connectors.update(
        connector_id="test-id", name="new name", url="https://example.com/search"
    )
    print(response)


asyncio.run(main())
