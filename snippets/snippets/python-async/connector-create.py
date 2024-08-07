import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.connectors.create(
        name="Example connector",
        url="https://connector-example.com/search",
    )
    print(response)

asyncio.run(main())
