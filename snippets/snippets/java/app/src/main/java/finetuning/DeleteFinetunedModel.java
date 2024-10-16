/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;

public class DeleteFinetunedModel {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    cohere.finetuning().deleteFinetunedModel("test-id");
  }
}
