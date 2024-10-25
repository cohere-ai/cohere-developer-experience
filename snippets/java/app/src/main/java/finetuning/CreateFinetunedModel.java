/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.*;

public class CreateFinetunedModel {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        CreateFinetunedModelResponse response =
                cohere.finetuning()
                        .createFinetunedModel(
                                FinetunedModel.builder()
                                        .name("test-finetuned-model")
                                        .settings(
                                                Settings.builder()
                                                        .baseModel(
                                                                BaseModel.builder()
                                                                        .baseType(
                                                                                BaseType
                                                                                        .BASE_TYPE_CHAT)
                                                                        .build())
                                                        .datasetId("my-dataset-id")
                                                        .build())
                                        .build());

        System.out.println(response);
    }
}
