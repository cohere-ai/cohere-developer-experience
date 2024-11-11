/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.BaseModel;
import com.cohere.api.resources.finetuning.finetuning.types.BaseType;
import com.cohere.api.resources.finetuning.finetuning.types.Settings;
import com.cohere.api.resources.finetuning.finetuning.types.UpdateFinetunedModelResponse;
import com.cohere.api.resources.finetuning.requests.FinetuningUpdateFinetunedModelRequest;

public class UpdateFinetunedModel {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    UpdateFinetunedModelResponse response =
        cohere
            .finetuning()
            .updateFinetunedModel(
                "test-id",
                FinetuningUpdateFinetunedModelRequest.builder()
                    .name("new name")
                    .settings(
                        Settings.builder()
                            .baseModel(
                                BaseModel.builder().baseType(BaseType.BASE_TYPE_CHAT).build())
                            .datasetId("my-dataset-id")
                            .build())
                    .build());

    System.out.println(response);
  }
}
