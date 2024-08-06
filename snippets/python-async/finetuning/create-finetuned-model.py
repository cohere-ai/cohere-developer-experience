from cohere.finetuning import (
    BaseModel,
    BaseType,
    FinetunedModel,
    Settings,
)
import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.finetuning.create_finetuned_model(
        request=FinetunedModel(
            name="test-finetuned-model",
            settings=Settings(
                base_model=BaseModel(
                    base_type=BaseType.BASE_TYPE_GENERATIVE,
                ),
                dataset_id="my-dataset-id",
            ),
        )
    )
    print(response)

asyncio.run(main())
