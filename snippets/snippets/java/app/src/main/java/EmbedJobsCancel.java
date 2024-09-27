/* (C)2024 */
import com.cohere.api.Cohere;

public class EmbedJobsCancel {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    cohere.embedJobs().cancel("job_id");
  }
}
