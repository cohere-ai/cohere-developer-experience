/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.ListFinetunedModelsResponse;

public class ListFinetunedModels {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    ListFinetunedModelsResponse response = cohere.finetuning().listFinetunedModels();

    System.out.println(response);
  }
}
