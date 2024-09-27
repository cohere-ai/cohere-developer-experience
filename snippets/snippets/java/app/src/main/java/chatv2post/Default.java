/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatRequest;
import com.cohere.api.types.*;
import java.util.List;

public class Default {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    ChatResponse response =
        cohere
            .v2()
            .chat(
                V2ChatRequest.builder()
                    .model("command-r-plus")
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(UserMessageContent.of("Who discovered" + " gravity?"))
                                    .build()),
                            ChatMessageV2.assistant(
                                AssistantMessage.builder()
                                    .content(
                                        AssistantMessageContent.of(
                                            "The man"
                                                + " who is"
                                                + " widely"
                                                + " credited"
                                                + " with"
                                                + " discovering"
                                                + " gravity"
                                                + " is Sir"
                                                + " Isaac"
                                                + " Newton"))
                                    .build())))
                    .build());

    System.out.println(response);
  }
}
