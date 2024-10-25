import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    await co.delete_dataset("id")

asyncio.run(main())
