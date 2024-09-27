/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.types.ListConnectorsResponse;

public class ConnectorsList {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    ListConnectorsResponse list = cohere.connectors().list();

    System.out.println(list);
  }
}
