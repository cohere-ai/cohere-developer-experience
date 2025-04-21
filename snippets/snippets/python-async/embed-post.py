import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.embed(
        texts=["hello", "goodbye"],
        model="embed-v4.0",
        input_type="classification",
    )
    print(response)


asyncio.run(main())
