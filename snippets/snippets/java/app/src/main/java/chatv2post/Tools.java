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
                    .model("command-a-reasoning-08-2025")
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(
                                        UserMessageContent.of(
                                            "Can you provide a sales summary for 29th September"
                                                + " 2023, and also give me some details about the"
                                                + " products in the 'Electronics' category, for"
                                                + " example their prices and stock levels?"))
                                    .build())))
                    .tools(
                        List.of(
                            ToolV2.builder()
                                .type("function")
                                .function(
                                    ToolV2Function.builder()
                                        .name("query_daily_sales_report")
                                        .description(
                                            "Connects to a database to retrieve overall sales"
                                                + " volumes and sales information for a given"
                                                + " day.")
                                        .parameters(
                                            Map.of(
                                                "type",
                                                "object",
                                                "properties",
                                                Map.of(
                                                    "day",
                                                    Map.of(
                                                        "description",
                                                        "Retrieves sales data for this day,"
                                                            + " formatted as YYYY-MM-DD.",
                                                        "type",
                                                        "string")),
                                                "required",
                                                List.of("day")))
                                        .build())
                                .build(),
                            ToolV2.builder()
                                .type("function")
                                .function(
                                    ToolV2Function.builder()
                                        .name("query_product_catalog")
                                        .description(
                                            "Connects to a product catalog with information"
                                                + " about all the products being sold, including"
                                                + " categories, prices, and stock levels.")
                                        .parameters(
                                            Map.of(
                                                "type",
                                                "object",
                                                "properties",
                                                Map.of(
                                                    "category",
                                                    Map.of(
                                                        "description",
                                                        "Retrieves product information data for all"
                                                            + " products in this category.",
                                                        "type",
                                                        "string")),
                                                "required",
                                                List.of("category")))
                                        .build())
                                .build()))
                    .build());

    System.out.println(response);
  }
}
