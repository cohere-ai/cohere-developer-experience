/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.types.EmbedJob;

public class EmebedJobsGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    EmbedJob response = cohere.embedJobs().get("job_id");

    System.out.println(response);
  }
}
