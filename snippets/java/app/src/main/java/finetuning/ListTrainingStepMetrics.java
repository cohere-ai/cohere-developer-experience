/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.ListTrainingStepMetricsResponse;

public class ListTrainingStepMetrics {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        ListTrainingStepMetricsResponse response =
                cohere.finetuning().listTrainingStepMetrics("test-id");

        System.out.println(response);
    }
}
