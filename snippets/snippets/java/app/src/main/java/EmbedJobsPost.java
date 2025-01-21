/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.embedjobs.requests.CreateEmbedJobRequest;
import com.cohere.api.types.CreateEmbedJobResponse;
import com.cohere.api.types.EmbedInputType;

public class EmbedJobsPost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    CreateEmbedJobResponse response =
        cohere
            .embedJobs()
            .create(
                CreateEmbedJobRequest.builder()
                    .model("embed-english-v3.0")
                    .datasetId("ds.id")
                    .inputType(EmbedInputType.SEARCH_DOCUMENT)
                    .build());

    System.out.println(response);
  }
}
