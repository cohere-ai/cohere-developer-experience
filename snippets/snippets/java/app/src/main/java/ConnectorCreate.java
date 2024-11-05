/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.connectors.requests.CreateConnectorRequest;
import com.cohere.api.types.CreateConnectorResponse;

public class ConnectorCreate {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    CreateConnectorResponse response =
        cohere
            .connectors()
            .create(
                CreateConnectorRequest.builder()
                    .name("Example connector")
                    .url("https://connector-example.com/search")
                    .build());

    System.out.println(response);
  }
}
