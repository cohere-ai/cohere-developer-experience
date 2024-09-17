package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.GetFinetunedModelResponse;

public class GetFinetunedModel {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token(System.getenv("CO_API_KEY")).clientName("snippet").build();

        GetFinetunedModelResponse response = cohere.finetuning().getFinetunedModel("test-id");

        System.out.println(response);
    }
}

