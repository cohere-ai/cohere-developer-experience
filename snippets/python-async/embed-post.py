import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.embed(
        texts=["hello", "goodbye"], model="embed-english-v3.0", input_type="classification"
    )
    print(response)

asyncio.run(main())
