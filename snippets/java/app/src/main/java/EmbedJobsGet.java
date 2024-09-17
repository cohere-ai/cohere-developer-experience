import com.cohere.api.Cohere;
import com.cohere.api.types.ListEmbedJobResponse;


public class EmbedJobsGet {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token(System.getenv("CO_API_KEY")).clientName("snippet").build();

        ListEmbedJobResponse response = cohere.embedJobs().list();

        System.out.println(response);
    }
}
