import com.cohere.api.Cohere;


public class EmbedJobsCancel {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token(System.getenv("CO_API_KEY")).clientName("snippet").build();

        cohere.embedJobs().cancel("job_id");
    }
}
