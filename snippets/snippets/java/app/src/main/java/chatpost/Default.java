/* (C)2024 */
package chatpost;

import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatRequest;
import com.cohere.api.types.ChatMessage;
import com.cohere.api.types.Message;
import com.cohere.api.types.NonStreamedChatResponse;
import java.util.List;

public class Default {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    NonStreamedChatResponse response =
        cohere.chat(
            ChatRequest.builder()
                .model("command-a-03-2025")
                .message("Tell me about LLMs")
                .build());

    System.out.println(response);
  }
}
