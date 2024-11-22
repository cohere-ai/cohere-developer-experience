import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    await co.delete_dataset("id")

asyncio.run(main())
