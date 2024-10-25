/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.requests.TokenizeRequest;
import com.cohere.api.types.TokenizeResponse;

public class TokenizePost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    TokenizeResponse response =
        cohere.tokenize(
            TokenizeRequest.builder().text("tokenize me").model("command-r-plus-08-2024").build());

    System.out.println(response);
  }
}
