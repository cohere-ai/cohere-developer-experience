import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    return await co.chat(
        model="command-a-03-2025",
        message="Tell me about LLMs"
    )


asyncio.run(main())
