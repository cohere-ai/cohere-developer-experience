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
                    .model("command-a-vision-07-2025")
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(
                                        UserMessageContent.of(
                                            List.of(
                                                Content.text(
                                                    TextContent.builder()
                                                        .text("Describe this image")
                                                        .build()),
                                                Content.imageUrl(
                                                    ImageContent.builder()
                                                        .imageUrl(
                                                            ImageUrl.builder()
                                                                // Can be either a base64 data URI or a web URL.
                                                                .url(
                                                                    "https://cohere.com/favicon-32x32.png")
                                                                .build())
                                                        .build()))))
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
