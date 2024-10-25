import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.datasets.get_usage()

    print(response)

asyncio.run(main())
