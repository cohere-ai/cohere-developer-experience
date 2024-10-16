/* (C)2024 */
import java.util.List;

import com.cohere.api.Cohere;
import com.cohere.api.requests.DetokenizeRequest;
import com.cohere.api.types.DetokenizeResponse;

public class DetokenizePost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    DetokenizeResponse response =
        cohere.detokenize(
            DetokenizeRequest.builder()
                .model("command-r-plus-08-2024")
                .tokens(List.of(8466, 5169, 2594, 8, 2792, 43))
                .build());

    System.out.println(response);
  }
}
