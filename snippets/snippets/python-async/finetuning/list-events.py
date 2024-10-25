import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.finetuning.list_events(finetuned_model_id="test-id")
    print(response)

asyncio.run(main())
