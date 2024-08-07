import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.models.list()
    print(response)

asyncio.run(main())
