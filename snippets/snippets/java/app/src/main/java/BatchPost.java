/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.batches.types.CreateBatchResponse;
import com.cohere.api.resources.batches.types.Batch;

public class BatchPost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    CreateBatchResponse response =
        cohere
            .batches()
            .create(
                Batch.builder()
                    .name("<batch_job_name>")
                    .inputDatasetId("<input_dataset_id>")
                    .model("<model_name>")
                    .build());

    System.out.println(response);
  }
}
