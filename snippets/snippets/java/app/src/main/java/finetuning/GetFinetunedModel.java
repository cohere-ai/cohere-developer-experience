/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.GetFinetunedModelResponse;

public class GetFinetunedModel {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    GetFinetunedModelResponse response = cohere.finetuning().getFinetunedModel("test-id");

    System.out.println(response);
  }
}
