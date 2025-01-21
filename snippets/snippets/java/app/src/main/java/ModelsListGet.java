/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.types.ListModelsResponse;

public class ModelsListGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    ListModelsResponse response = cohere.models().list();

    System.out.println(response);
  }
}
