import com.cohere.api.Cohere;
import com.cohere.api.resources.batches.types.ListBatchesResponse;

public class BatchGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    ListBatchesResponse response = cohere.batches().list();

    System.out.println(response);
  }
}