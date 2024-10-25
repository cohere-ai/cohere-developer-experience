import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.connectors.get("test-id")
    print(response)

asyncio.run(main())
