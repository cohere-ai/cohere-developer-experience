/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.types.GetConnectorResponse;

public class ConnectorGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    GetConnectorResponse response = cohere.connectors().get("test-id");

    System.out.println(response);
  }
}
