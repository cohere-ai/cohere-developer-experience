package finetuning;

import com.cohere.api.Cohere;


public class DeleteFinetunedModel {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token(System.getenv("CO_API_KEY")).clientName("snippet").build();

        cohere.finetuning().deleteFinetunedModel("test-id");
    }
}
