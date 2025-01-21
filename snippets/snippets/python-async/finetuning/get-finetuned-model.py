import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.finetuning.get_finetuned_model("test-id")
    print(response)


asyncio.run(main())
