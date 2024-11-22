import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.datasets.get(id="<<datasetId>>")

    print(response)

asyncio.run(main())
