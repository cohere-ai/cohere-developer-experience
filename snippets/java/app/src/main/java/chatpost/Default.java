/* (C)2024 */
package chatpost;

import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatRequest;
import com.cohere.api.types.ChatMessage;
import com.cohere.api.types.ChatMessageRole;
import com.cohere.api.types.NonStreamedChatResponse;
import java.util.List;

public class Default {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        NonStreamedChatResponse response =
                cohere.chat(
                        ChatRequest.builder()
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

        System.out.println(response);
    }
}
