import com.cohere.api.Cohere;
import com.cohere.api.requests.EmbedRequest;
import com.cohere.api.types.EmbedInputType;
import com.cohere.api.types.EmbedResponse;

import java.util.List;


public class EmbedPost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

        EmbedResponse response = cohere.embed(EmbedRequest.builder().texts(List.of("hello", "goodbye")).model("embed-english-v3.0").inputType(EmbedInputType.CLASSIFICATION).build());

        System.out.println(response);
    }
}
