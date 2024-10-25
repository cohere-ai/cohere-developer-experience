import cohere
import asyncio

co = cohere.AsyncClient()


async def main():

    # upload a dataset
    response = await co.datasets.create(
        name="chat-dataset",
        data=open("./chat.jsonl", "rb"),
        type="chat-finetune-input",
    )

    # wait for validation to complete
    response = await co.wait(response)

    print(response)

asyncio.run(main())
