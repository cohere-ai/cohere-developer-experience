import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.embed_jobs.list()

    print(response)


asyncio.run(main())
