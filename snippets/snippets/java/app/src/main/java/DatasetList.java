/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.types.DatasetsListResponse;

public class DatasetList {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    DatasetsListResponse response = cohere.datasets().list();

    System.out.println(response);
  }
}
