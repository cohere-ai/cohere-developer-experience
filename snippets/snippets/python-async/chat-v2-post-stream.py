import cohere
import asyncio

co = cohere.AsyncClientV2()

async def main():
    response = co.chat_stream(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": "hello world!"}],
    )

    async for event in response:
        if event.type == "message-start":
            print("\nMessage started.")
        elif event.type == "content-delta":
            print(event.delta.message.content.text, end="")
        elif event.type == "message-end":
            print("\nMessage ended.")

asyncio.run(main())
