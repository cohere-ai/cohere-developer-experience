import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    await co.connectors.delete("test-id")

asyncio.run(main())
