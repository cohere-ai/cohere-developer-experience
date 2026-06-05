import cohere
import asyncio

co = cohere.AsyncClientV2()


async def main():
    text_inputs = [
        {
            "content": [
                {"type": "text", "text": "hello"},
                {"type": "text", "text": "goodbye"}
            ]
        },
    ]

    response = await co.embed(
        inputs=text_inputs,
        model="embed-v4.0",
        input_type="classification",
        embedding_types=["float"],
    )
    print(response)


asyncio.run(main())
