import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.detokenize(
        tokens=[8466, 5169, 2594, 8, 2792, 43],
        model="command-a-03-2025",  # optional
    )
    print(response)


asyncio.run(main())
