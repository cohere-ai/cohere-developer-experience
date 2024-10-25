from cohere.finetuning import (
    BaseModel,
    FinetunedModel,
    Settings,
)
import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    response = await co.finetuning.create_finetuned_model(
        request=FinetunedModel(
            name="test-finetuned-model",
            settings=Settings(
                base_model=BaseModel(
                    base_type="BASE_TYPE_CHAT",
                ),
                dataset_id="my-dataset-id",
            ),
        )
    )
    print(response)

asyncio.run(main())
