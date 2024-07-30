/* (C)2024 */
package chatpost;

import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatRequest;
import com.cohere.api.types.NonStreamedChatResponse;
import com.cohere.api.types.Tool;
import com.cohere.api.types.ToolParameterDefinitionsValue;
import java.util.List;
import java.util.Map;

public class Tools {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

        NonStreamedChatResponse response =
                cohere.chat(
                        ChatRequest.builder()
                                .message(
                                        "Can you provide a sales summary for 29th September 2023,"
                                            + " and also give me some details about the products in"
                                            + " the 'Electronics' category, for example their"
                                            + " prices and stock levels?")
                                .tools(
                                        List.of(
                                                Tool.builder()
                                                        .name("query_daily_sales_report")
                                                        .description(
                                                                "Connects to a database to retrieve"
                                                                    + " overall sales volumes and"
                                                                    + " sales information for a"
                                                                    + " given day.")
                                                        .parameterDefinitions(
                                                                Map.of(
                                                                        "day",
                                                                        ToolParameterDefinitionsValue
                                                                                .builder()
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
                                                        .build(),
                                                Tool.builder()
                                                        .name("query_product_catalog")
                                                        .description(
                                                                "Connects to a a product catalog"
                                                                    + " with information about all"
                                                                    + " the products being sold,"
                                                                    + " including categories,"
                                                                    + " prices, and stock levels.")
                                                        .parameterDefinitions(
                                                                Map.of(
                                                                        "category",
                                                                        ToolParameterDefinitionsValue
                                                                                .builder()
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
                                                        .build()))
                                .build());

        System.out.println(response);
    }
}
