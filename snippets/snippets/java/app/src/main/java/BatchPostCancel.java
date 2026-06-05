/* (C)2024 */
import com.cohere.api.Cohere;

public class BatchPostCancel {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    cohere.batches().cancel("<batch_job_id>");
  }
}