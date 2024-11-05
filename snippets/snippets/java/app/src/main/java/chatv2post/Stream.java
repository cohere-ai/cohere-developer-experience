/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatStreamRequest;
import com.cohere.api.types.*;
import java.util.List;

public class Stream {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    Iterable<StreamedChatResponseV2> response =
        cohere
            .v2()
            .chatStream(
                V2ChatStreamRequest.builder()
                    .model("command-r-plus-08-2024")
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

    for (StreamedChatResponseV2 chatResponse : response) {
      if (chatResponse.isContentDelta()) {
        System.out.println(
            chatResponse
                .getContentDelta()
                .flatMap(ChatContentDeltaEvent::getDelta)
                .flatMap(ChatContentDeltaEventDelta::getMessage)
                .flatMap(ChatContentDeltaEventDeltaMessage::getContent)
                .flatMap(ChatContentDeltaEventDeltaMessageContent::getText)
                .orElse(""));
      }
    }

    System.out.println(response);
  }
}
