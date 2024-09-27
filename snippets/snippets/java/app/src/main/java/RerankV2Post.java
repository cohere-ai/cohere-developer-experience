/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2RerankRequest;
import com.cohere.api.resources.v2.types.V2RerankRequestDocumentsItem;
import com.cohere.api.resources.v2.types.V2RerankResponse;
import java.util.List;

public class RerankV2Post {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    V2RerankResponse response =
        cohere
            .v2()
            .rerank(
                V2RerankRequest.builder()
                    .model("rerank-english-v3.0")
                    .query("What is the capital of the United States?")
                    .documents(
                        List.of(
                            V2RerankRequestDocumentsItem.of(
                                "Carson City is the capital city of"
                                    + " the American state of"
                                    + " Nevada."),
                            V2RerankRequestDocumentsItem.of(
                                "The Commonwealth of the Northern"
                                    + " Mariana Islands is a group"
                                    + " of islands in the Pacific"
                                    + " Ocean. Its capital is"
                                    + " Saipan."),
                            V2RerankRequestDocumentsItem.of(
                                "Capitalization or capitalisation"
                                    + " in English grammar is the"
                                    + " use of a capital letter at"
                                    + " the start of a word."
                                    + " English usage varies from"
                                    + " capitalization in other"
                                    + " languages."),
                            V2RerankRequestDocumentsItem.of(
                                "Washington, D.C. (also known as"
                                    + " simply Washington or D.C.,"
                                    + " and officially as the"
                                    + " District of Columbia) is"
                                    + " the capital of the United"
                                    + " States. It is a federal"
                                    + " district."),
                            V2RerankRequestDocumentsItem.of(
                                "Capital punishment (the death"
                                    + " penalty) has existed in the"
                                    + " United States since"
                                    + " beforethe United States was"
                                    + " a country. As of 2017,"
                                    + " capital punishment is legal"
                                    + " in 30 of the 50 states.")))
                    .topN(3)
                    .build());

    System.out.println(response);
  }
}
