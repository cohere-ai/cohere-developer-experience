package embedv2post; /* (C)2024 */

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2EmbedRequest;
import com.cohere.api.types.EmbedByTypeResponse;
import com.cohere.api.types.EmbedInputType;
import com.cohere.api.types.EmbeddingType;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.Base64;
import java.util.List;

public class EmbedImagePost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    try {
      URI uri = URI.create("https://cohere.com/favicon-32x32.png");
      URL url = uri.toURL();
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      connection.connect();

      InputStream inputStream = connection.getInputStream();
      byte[] buffer = inputStream.readAllBytes();
      inputStream.close();

      String imageBase64 =
          String.format(
              "data:%s;base64,%s",
              connection.getHeaderField("Content-Type"),
              Base64.getEncoder().encodeToString(buffer));

      EmbedByTypeResponse response =
          cohere
              .v2()
              .embed(
                  V2EmbedRequest.builder()
                      .model("embed-v4.0")
                      .inputType(EmbedInputType.IMAGE)
                      .images(List.of(imageBase64))
                      .embeddingTypes(List.of(EmbeddingType.FLOAT))
                      .build());

      System.out.println(response);
    } catch (MalformedURLException e) {
      System.err.println("Invalid URL: " + e.getMessage());
    } catch (IOException e) {
      System.err.println("I/O error: " + e.getMessage());
    }
  }
}
