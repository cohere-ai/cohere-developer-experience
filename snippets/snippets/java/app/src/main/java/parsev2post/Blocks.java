package parsev2post; /* (C)2024 */

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.ParseRequest;
import com.cohere.api.types.ParseDocument;
import com.cohere.api.types.ParseOutputFormat;
import com.cohere.api.types.ParseResponse;

public class Blocks {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    ParseResponse response =
        cohere
            .v2()
            .parse(
                ParseRequest.builder()
                    .model("parse-v5.0")
                    .document(
                        ParseDocument.builder()
                            .imageUrl("https://cohere.com/favicon-32x32.png")
                            .build())
                    .outputFormat(ParseOutputFormat.BLOCKS)
                    .build());

    System.out.println(response);
  }
}
