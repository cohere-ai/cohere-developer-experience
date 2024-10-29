/* (C)2024 */
import com.cohere.api.Cohere;

public class ConnectorDelete {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    cohere.connectors().delete("test-id");
  }
}
