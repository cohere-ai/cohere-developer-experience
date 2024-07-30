import com.cohere.api.Cohere;
import com.cohere.api.requests.GenerateRequest;
import com.cohere.api.types.Generation;


public class GeneratePost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

        Generation response = cohere.generate(GenerateRequest.builder().prompt("Please explain to me how LLMs work").build());

        System.out.println(response);
    }
}
