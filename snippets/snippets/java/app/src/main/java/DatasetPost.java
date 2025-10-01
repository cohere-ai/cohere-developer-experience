/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.requests.DatasetsCreateRequest;
import com.cohere.api.resources.datasets.types.DatasetsCreateResponse;
import com.cohere.api.types.DatasetType;
import java.util.Optional;

public class DatasetPost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    DatasetsCreateResponse response =
        cohere
            .datasets()
            .create(
                null,
                Optional.empty(),
                DatasetsCreateRequest.builder()
                    .name("embed-dataset")
                    .type(DatasetType.EMBED_INPUT)
                    .build());

    System.out.println(response);
  }
}
