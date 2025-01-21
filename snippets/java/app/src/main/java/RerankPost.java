import com.cohere.api.Cohere;
import com.cohere.api.requests.RerankRequest;
import com.cohere.api.types.RerankRequestDocumentsItem;
import com.cohere.api.types.RerankResponse;

import java.util.List;


public class RerankPost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

        RerankResponse response = cohere.rerank(RerankRequest.builder().query("What is the capital of the United States?").documents(List.of(
                RerankRequestDocumentsItem.of("Carson City is the capital city of the American state of Nevada."),
                RerankRequestDocumentsItem.of("The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan."),
                RerankRequestDocumentsItem.of("Capitalization or capitalisation in English grammar is the use of a capital letter at the start of a word. English usage varies from capitalization in other languages."),
                RerankRequestDocumentsItem.of("Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district."),
                RerankRequestDocumentsItem.of("Capital punishment has existed in the United States since beforethe United States was a country. As of 2017, capital punishment is legal in 30 of the 50 states.")
        )).model("rerank-english-v3.0").topN(3).build());

        System.out.println(response);
    }
}
