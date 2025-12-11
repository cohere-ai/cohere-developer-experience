import com.cohere.api.Cohere;
import com.cohere.api.resources.batches.types.GetBatchResponse;

public class BatchGetId {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    GetBatchResponse response = cohere.batches().retrieve("<batch_job_id>");

    System.out.println(response);
  }
}