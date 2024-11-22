from cohere.finetuning import (
    BaseModel,
    Settings,
)
import cohere

co = cohere.Client()
finetuned_model = co.finetuning.update_finetuned_model(
    id="test-id",
    name="new name",
    settings=Settings(
        base_model=BaseModel(
            base_type="BASE_TYPE_CHAT",
        ),
        dataset_id="my-dataset-id",
    ),
)

print(finetuned_model)
