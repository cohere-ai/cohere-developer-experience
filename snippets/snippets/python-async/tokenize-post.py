import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.tokenize(text="tokenize me! :D", model="command-r-plus-08-2024")
    print(response)

asyncio.run(main())
