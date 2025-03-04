/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.types.ListEmbedJobResponse;

public class EmbedJobsGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    ListEmbedJobResponse response = cohere.embedJobs().list();

    System.out.println(response);
  }
}
