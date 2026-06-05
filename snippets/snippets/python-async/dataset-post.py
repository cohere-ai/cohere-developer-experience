import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    # upload a dataset
    response = await co.datasets.create(
        name="embed-dataset",
        data=open("./embed.jsonl", "rb"),
        type="embed-input",
    )

    # wait for validation to complete
    response = await co.wait(response)

    print(response)


asyncio.run(main())
