/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2RerankRequest;
import com.cohere.api.resources.v2.types.V2RerankResponse;
import com.cohere.api.types.RerankRelevantSpans;
import com.cohere.api.types.RerankRelevantSpansMode;
import java.util.List;

public class RerankV2Post {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    V2RerankResponse response =
        cohere
            .v2()
            .rerank(
                V2RerankRequest.builder()
                    .model("rerank-v5.0-pro")
                    .query("What is the capital of the United States?")
                    .documents(
                        List.of(
                            "Carson City is the capital city of the American state of Nevada.",
                            "The Commonwealth of the Northern Mariana Islands is a group of islands"
                                + " in the Pacific Ocean. Its capital is Saipan.",
                            "Capitalization or capitalisation in English grammar is the use of a"
                                + " capital letter at the start of a word. English usage varies"
                                + " from capitalization in other languages.",
                            "Washington, D.C. (also known as simply Washington or D.C., and"
                                + " officially as the District of Columbia) is the capital of the"
                                + " United States. It is a federal district.",
                            "Capital gains are profits from the sale of an asset such as stocks or"
                                + " real estate. In the United States, long-term capital gains are"
                                + " taxed at lower rates than ordinary income."))
                    .topN(3)
                    .relevantSpans(
                        RerankRelevantSpans.builder()
                            .mode(RerankRelevantSpansMode.ENABLED)
                            .threshold(0.1f)
                            .maxSpans(3)
                            .build())
                    .build());

    System.out.println(response);
  }
}
