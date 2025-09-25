/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatStreamRequest;
import com.cohere.api.resources.v2.types.V2ChatStreamRequestDocumentsItem;
import com.cohere.api.types.*;
import java.util.List;

public class StreamDocuments {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    Iterable<StreamedChatResponseV2> response =
        cohere
            .v2()
            .chatStream(
                V2ChatStreamRequest.builder()
                    .model("command-a-03-2025")
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(UserMessageContent.of("Who is the most popular?"))
                                    .build())))
                    .documents(
                        List.of(
                            V2ChatStreamRequestDocumentsItem.of(
                                "↓ Skip to Main Content\n\n"
                                    + "Music industry – One step closer to being accurate\n\n"
                                    + "CSPC: Backstreet Boys Popularity Analysis\n\n"
                                    + "At one point, Backstreet Boys defined success: massive album"
                                    + " sales..."),
                            V2ChatStreamRequestDocumentsItem.of(
                                "↓ Skip to Main Content\n\n"
                                    + "CSPC: NSYNC Popularity Analysis\n\n"
                                    + "At the turn of the millennium, three teen acts were huge:"
                                    + " Backstreet Boys, Britney Spears, and NSYNC..."),
                            V2ChatStreamRequestDocumentsItem.of(
                                "Yet the way many music consumers embraced Backstreet Boys deserves"
                                    + " its own chapter..."),
                            V2ChatStreamRequestDocumentsItem.of(
                                "Was NSYNC only successful in the US, or were they a global"
                                    + " phenomenon?...")))
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
