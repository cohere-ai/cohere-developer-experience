import cohere
import asyncio

co = cohere.AsyncClientV2()


async def main():
    response = await co.embed(
        texts=["hello", "goodbye"], model="embed-english-v3.0", input_type="classification", embedding_types=["float"]
    )
    print(response)

asyncio.run(main())
