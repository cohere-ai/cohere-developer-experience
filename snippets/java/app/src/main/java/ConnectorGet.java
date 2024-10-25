import com.cohere.api.Cohere;
import com.cohere.api.types.GetConnectorResponse;


public class ConnectorGet {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        GetConnectorResponse response = cohere.connectors().get("test-id");

        System.out.println(response);
    }
}
