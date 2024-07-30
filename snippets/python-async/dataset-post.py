import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():

    # upload a dataset
    response = await co.datasets.create(
        name="prompt-completion-dataset",
        data=open("./prompt-completion.jsonl", "rb"),
        type="prompt-completion-finetune-input",
    )

    # wait for validation to complete
    response = await co.wait(response)

    print(response)

asyncio.run(main())
