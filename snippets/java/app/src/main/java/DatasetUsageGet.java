import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.types.DatasetsGetUsageResponse;


public class DatasetUsageGet {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token(System.getenv("CO_API_KEY")).clientName("snippet").build();

        DatasetsGetUsageResponse response = cohere.datasets().getUsage();

        System.out.println(response);
    }
}
