import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    await co.connectors.delete("test-id")


asyncio.run(main())
