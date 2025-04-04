import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.tokenize(text="tokenize me! :D", model="command-a-03-2025")
    print(response)


asyncio.run(main())
