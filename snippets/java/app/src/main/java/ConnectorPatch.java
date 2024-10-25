import com.cohere.api.Cohere;
import com.cohere.api.resources.connectors.requests.UpdateConnectorRequest;


public class ConnectorPatch {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        cohere.connectors().update("test-id", UpdateConnectorRequest.builder()
                .name("new name")
                .url("https://connector-example.com/search").build());
    }
}
