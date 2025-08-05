/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatStreamRequest;
import com.cohere.api.types.*;
import java.util.List;
import java.util.Map;

public class StreamTools {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    Iterable<StreamedChatResponseV2> response =
        cohere
            .v2()
            .chatStream(
                V2ChatStreamRequest.builder()
                    .model("command-a-03-2025")
                    .tools(
                        List.of(
                            ToolV2.builder()
                                .function(
                                    ToolV2Function.builder()
                                        .name("query_daily_sales_report")
                                        .description(
                                            "Connects to a database to retrieve overall sales"
                                                + " volumes and sales information for a given day.")
                                        .parameters(
                                            Map.of(
                                                "day",
                                                ToolParameterDefinitionsValue.builder()
                                                    .type("str")
                                                    .description(
                                                        "Retrieves sales data for this day,"
                                                            + " formatted as YYYY-MM-DD.")
                                                    .required(true)
                                                    .build()))
                                        .build())
                                .build(),
                            ToolV2.builder()
                                .function(
                                    ToolV2Function.builder()
                                        .name("query_product_catalog")
                                        .description(
                                            "Connects to a product catalog with information about"
                                                + " all the products being sold, including"
                                                + " categories, prices, and stock levels.")
                                        .parameters(
                                            Map.of(
                                                "category",
                                                ToolParameterDefinitionsValue.builder()
                                                    .type("str")
                                                    .description(
                                                        "Retrieves product information data for all"
                                                            + " products in this category.")
                                                    .required(true)
                                                    .build()))
                                        .build())
                                .build()))
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(
                                        UserMessageContent.of(
                                            "Can you provide a sales summary for 29th September"
                                                + " 2023, and also give me some details about the"
                                                + " products in the 'Electronics' category?"))
                                    .build())))
                    .build());

    for (StreamedChatResponseV2 chatResponse : response) {
      if (chatResponse.isContentDelta()) {
        String text =
            chatResponse
                .getContentDelta()
                .flatMap(ChatContentDeltaEvent::getDelta)
                .flatMap(ChatContentDeltaEventDelta::getMessage)
                .flatMap(ChatContentDeltaEventDeltaMessage::getContent)
                .flatMap(ChatContentDeltaEventDeltaMessageContent::getText)
                .orElse("");
        System.out.println(text);
      }
    }
  }
}
