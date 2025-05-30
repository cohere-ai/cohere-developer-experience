/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatRequest;
import com.cohere.api.types.*;
import java.util.List;
import java.util.Map;

public class Tools {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    ChatResponse response =
        cohere
            .v2()
            .chat(
                V2ChatRequest.builder()
                    .model("command-a-03-2025")
                    .tools(
                        List.of(
                            ToolV2.builder()
                                .function(
                                    ToolV2Function.builder()
                                        .name("query_daily_sales_report")
                                        .description(
                                            "Connects"
                                                + " to a"
                                                + " database"
                                                + " to retrieve"
                                                + " overall"
                                                + " sales"
                                                + " volumes"
                                                + " and sales"
                                                + " information"
                                                + " for a"
                                                + " given"
                                                + " day.")
                                        .parameters(
                                            Map.of(
                                                "day",
                                                ToolParameterDefinitionsValue.builder()
                                                    .type("str")
                                                    .description(
                                                        "Retrieves"
                                                            + " sales"
                                                            + " data"
                                                            + " for this"
                                                            + " day,"
                                                            + " formatted"
                                                            + " as YYYY-MM-DD.")
                                                    .required(true)
                                                    .build()))
                                        .build())
                                .build(),
                            ToolV2.builder()
                                .function(
                                    ToolV2Function.builder()
                                        .name("query_product_catalog")
                                        .description(
                                            "Connects"
                                                + " to a"
                                                + " a product"
                                                + " catalog"
                                                + " with"
                                                + " information"
                                                + " about"
                                                + " all the"
                                                + " products"
                                                + " being"
                                                + " sold,"
                                                + " including"
                                                + " categories,"
                                                + " prices,"
                                                + " and stock"
                                                + " levels.")
                                        .parameters(
                                            Map.of(
                                                "category",
                                                ToolParameterDefinitionsValue.builder()
                                                    .type("str")
                                                    .description(
                                                        "Retrieves"
                                                            + " product"
                                                            + " information"
                                                            + " data"
                                                            + " for all"
                                                            + " products"
                                                            + " in this"
                                                            + " category.")
                                                    .required(true)
                                                    .build()))
                                        .build())
                                .build()))
                    .build());

    System.out.println(response);
  }
}
