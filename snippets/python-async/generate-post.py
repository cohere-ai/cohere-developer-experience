import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.generate(
        prompt="Please explain to me how LLMs work",
    )
    print(response)

asyncio.run(main())
