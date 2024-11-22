/* (C)2024 */
package chatpost;

import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatStreamRequest;
import com.cohere.api.types.ChatMessage;
import com.cohere.api.types.ChatMessageRole;
import com.cohere.api.types.ChatTextGenerationEvent;
import com.cohere.api.types.StreamedChatResponse;
import java.util.List;

public class Stream {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

        Iterable<StreamedChatResponse> response =
                cohere.chatStream(
                        ChatStreamRequest.builder()
                                .message("What year was he born?")
                                .chatHistory(
                                        List.of(
                                                ChatMessage.builder()
                                                        .role(ChatMessageRole.USER)
                                                        .message("Who discovered gravity?")
                                                        .build(),
                                                ChatMessage.builder()
                                                        .role(ChatMessageRole.CHATBOT)
                                                        .message(
                                                                "The man who is widely credited"
                                                                    + " with discovering gravity is"
                                                                    + " Sir Isaac Newton")
                                                        .build()))
                                .build());

        for (StreamedChatResponse chatResponse : response) {
            if (chatResponse.isTextGeneration()) {
                System.out.println(
                        chatResponse
                                .getTextGeneration()
                                .map(ChatTextGenerationEvent::getText)
                                .orElse(""));
            }
        }

        System.out.println(response);
    }
}
