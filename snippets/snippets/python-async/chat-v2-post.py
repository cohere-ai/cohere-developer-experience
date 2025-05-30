import cohere
import asyncio

co = cohere.AsyncClientV2()


async def main():
    response = await co.chat(
        model="command-a-03-2025",
        messages=[cohere.UserChatMessageV2(content="hello world!")],
    )

    print(response)


asyncio.run(main())
