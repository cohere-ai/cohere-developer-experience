import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.connectors.list()
    print(response)

asyncio.run(main())
