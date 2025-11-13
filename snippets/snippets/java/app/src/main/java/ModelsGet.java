/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.types.GetModelResponse;

public class ModelsGet {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    GetModelResponse response = cohere.models().get("command-a-03-2025");
    System.out.println(response);
  }
}
