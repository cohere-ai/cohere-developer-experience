import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.models.get(
    model="command-a-plus-05-2026",
)
    print(response)


asyncio.run(main())
