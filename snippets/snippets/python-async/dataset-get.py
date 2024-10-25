import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.datasets.get(id="<<datasetId>>")

    print(response)

asyncio.run(main())
