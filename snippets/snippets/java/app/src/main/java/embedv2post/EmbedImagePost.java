package embedv2post; /* (C)2024 */

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.Base64;
import java.util.List;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2EmbedRequest;
import com.cohere.api.types.EmbedByTypeResponse;
import com.cohere.api.types.EmbedInputType;
import com.cohere.api.types.EmbeddingType;

public class EmbedImagePost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    URL url =
        URI.toUrl(
            "https://cohere.com/favicon-32x32.png");
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.connect();

    InputStream inputStream = connection.getInputStream();
    byte[] buffer = inputStream.readAllBytes();
    inputStream.close();

    String imageBase64 =
        String.format(
            "data:%s;base64,%s",
            connection.getHeaderField("Content-Type"), Base64.getEncoder().encodeToString(buffer));

    EmbedByTypeResponse response =
        cohere
            .v2()
            .embed(
                V2EmbedRequest.builder()
                    .model("embed-english-v3.0")
                    .inputType(EmbedInputType.IMAGE)
                    .images(List.of(imageBase64))
                    .embeddingTypes(List.of(EmbeddingType.FLOAT))
                    .build());

    System.out.println(response);
  }
}
