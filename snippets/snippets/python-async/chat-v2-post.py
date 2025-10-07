import cohere
import asyncio

co = cohere.AsyncClientV2()

async def main():
    response = await co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": "Tell me about LLMs"}],
    )
    print(response)

asyncio.run(main())
