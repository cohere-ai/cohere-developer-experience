import cohere
import asyncio

co = cohere.AsyncClientV2("<<apiKey>>")


async def main():
    response = await co.chat(
        model="command-r-plus",
        messages=[
            cohere.v2.ChatMessage2_User(
                content="hello world!"
            )
        ]
    )

    print(response)

asyncio.run(main())
