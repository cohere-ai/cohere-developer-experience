/* (C)2024 */
package chatv2post;

import java.util.List;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatRequest;
import com.cohere.api.types.ChatMessageV2;
import com.cohere.api.types.ChatResponse;
import com.cohere.api.types.Content;
import com.cohere.api.types.ImageContent;
import com.cohere.api.types.ImageUrl;
import com.cohere.api.types.TextContent;
import com.cohere.api.types.UserMessage;
import com.cohere.api.types.UserMessageContent;

public class Image {

    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        ChatResponse response
                = cohere
                        .v2()
                        .chat(
                                V2ChatRequest.builder()
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
                                                                                                                .text("Describe the logo!")
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
        System.out.println(response);
    }
}
