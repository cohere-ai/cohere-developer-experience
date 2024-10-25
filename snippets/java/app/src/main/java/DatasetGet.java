import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.types.DatasetsGetResponse;


public class DatasetGet {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        DatasetsGetResponse response = cohere.datasets().get("dataset_id");

        System.out.println(response);
    }
}
