import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.tokenize(text="tokenize me! :D", model="command")
    print(response)

asyncio.run(main())
