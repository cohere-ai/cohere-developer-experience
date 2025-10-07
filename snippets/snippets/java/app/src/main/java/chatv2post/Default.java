/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatRequest;
import com.cohere.api.types.*;
import java.util.List;

public class Default {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    ChatResponse response =
        cohere
            .v2()
            .chat(
                V2ChatRequest.builder()
                    .model("command-a-03-2025")
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(UserMessageContent.of("Tell me about LLMs"))
                                    .build())))
                    .build());

    System.out.println(response);
  }
}
