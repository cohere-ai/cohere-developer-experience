import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.finetuning.update_finetuned_model(id="test-id", name="new name")
    print(response)

asyncio.run(main())
