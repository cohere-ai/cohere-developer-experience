/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2EmbedRequest;
import com.cohere.api.types.EmbedByTypeResponse;
import com.cohere.api.types.EmbedInputType;
import java.util.List;

public class EmbedV2Post {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    EmbedByTypeResponse response =
        cohere
            .v2()
            .embed(
                V2EmbedRequest.builder()
                    .model("embed-english-v3.0")
                    .texts(List.of("hello", "goodbye"))
                    .inputType(EmbedInputType.CLASSIFICATION)
                    .build());

    System.out.println(response);
  }
}
