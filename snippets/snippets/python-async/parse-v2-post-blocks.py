import asyncio

import cohere

co = cohere.AsyncClientV2()


async def main():
    response = await co.parse(
        model="parse-v5.0",
        document={
            "type": "image_url",
            "image_url": "https://cohere.com/favicon-32x32.png",
        },
        output_format="blocks",
    )
    print(response)


asyncio.run(main())
