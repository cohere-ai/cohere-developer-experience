import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.finetuning.list_finetuned_models()
    print(response)


asyncio.run(main())
