import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    await co.finetuning.delete_finetuned_model("test-id")


asyncio.run(main())
