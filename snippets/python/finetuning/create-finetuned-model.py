from cohere.finetuning import (
    BaseModel,
    FinetunedModel,
    Hyperparameters,
    Settings,
)
import cohere

co = cohere.Client()
hp = Hyperparameters(
    early_stopping_patience=10,
    early_stopping_threshold=0.001,
    train_batch_size=16,
    train_epoch=1,
    learning_rate=0.01,
)
finetuned_model = co.finetuning.create_finetuned_model(
    request=FinetunedModel(
        name="test-finetuned-model",
        settings=Settings(
            base_model=BaseModel(
                base_type="BASE_TYPE_CHAT",
            ),
            dataset_id="my-dataset-id",
            hyperparameters=hp,
        ),
    )
)
print(finetuned_model)
