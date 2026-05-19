import cohere
import asyncio

co = cohere.AsyncClientV2()

async def main():
    response = await co.chat(
        model="command-a-plus-05-2026",
        messages=[{"role": "user", "content": "Tell me about LLMs"}],
    )
    print(response)

asyncio.run(main())
