import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.embed(
        texts=["hello", "goodbye"],
        model="embed-v5.0-fast",
        input_type="search_document",
    )
    print(response)


asyncio.run(main())
