/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.requests.SummarizeRequest;
import com.cohere.api.types.SummarizeResponse;

public class SummarizePost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        SummarizeResponse response =
                cohere.summarize(
                        SummarizeRequest.builder()
                                .text(
                                        """
                              Ice cream is a sweetened frozen food typically eaten as a snack or dessert.\s
                              It may be made from milk or cream and is flavoured with a sweetener,\s
                              either sugar or an alternative, and a spice, such as cocoa or vanilla,\s
                              or with fruit such as strawberries or peaches.\s
                              It can also be made by whisking a flavored cream base and liquid nitrogen together.\s
                              Food coloring is sometimes added, in addition to stabilizers.\s
                              The mixture is cooled below the freezing point of water and stirred to incorporate air spaces\s
                              and to prevent detectable ice crystals from forming. The result is a smooth,\s
                              semi-solid foam that is solid at very low temperatures (below 2 °C or 35 °F).\s
                              It becomes more malleable as its temperature increases.\\n\\n
                              The meaning of the name "ice cream" varies from one country to another.\s
                              In some countries, such as the United States, "ice cream" applies only to a specific variety,\s
                              and most governments regulate the commercial use of the various terms according to the\s
                              relative quantities of the main ingredients, notably the amount of cream.\s
                              Products that do not meet the criteria to be called ice cream are sometimes labelled\s
                              "frozen dairy dessert" instead. In other countries, such as Italy and Argentina,\s
                              one word is used fo\\r all variants. Analogues made from dairy alternatives,\s
                              such as goat's or sheep's milk, or milk substitutes\s
                              (e.g., soy, cashew, coconut, almond milk or tofu), are available for those who are\s
                              lactose intolerant, allergic to dairy protein or vegan.
                        """)
                                .build());

        System.out.println(response);
    }
}
