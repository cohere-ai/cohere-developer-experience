import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.models.get(
    model="command-a-03-2025",
)
    print(response)


asyncio.run(main())
