/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.types.DatasetsGetResponse;

public class DatasetGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    DatasetsGetResponse response = cohere.datasets().get("dataset_id");

    System.out.println(response);
  }
}
