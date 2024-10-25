/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.types.DatasetsGetUsageResponse;

public class DatasetUsageGet {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        DatasetsGetUsageResponse response = cohere.datasets().getUsage();

        System.out.println(response);
    }
}
