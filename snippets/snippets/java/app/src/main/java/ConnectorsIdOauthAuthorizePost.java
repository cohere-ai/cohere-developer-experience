/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.connectors.requests.ConnectorsOAuthAuthorizeRequest;
import com.cohere.api.types.OAuthAuthorizeResponse;

public class ConnectorsIdOauthAuthorizePost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    OAuthAuthorizeResponse response =
        cohere
            .connectors()
            .oAuthAuthorize(
                "test-id",
                ConnectorsOAuthAuthorizeRequest.builder()
                    .afterTokenRedirect("https://connector-example.com/search")
                    .build());

    System.out.println(response);
  }
}
