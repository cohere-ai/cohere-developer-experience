/* (C)2024 */
import com.cohere.api.Cohere;
import com.cohere.api.resources.audio.transcriptions.requests.TranscriptionsCreateRequest;
import com.cohere.api.resources.audio.transcriptions.types.AudioTranscriptionsCreateResponse;
import java.io.File;

public class TranscriptionsPost {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().clientName("snippet").build();

    AudioTranscriptionsCreateResponse response =
        cohere
            .audio()
            .transcriptions()
            .create(
                new File("./sample.wav"),
                TranscriptionsCreateRequest.builder()
                    .model("cohere-transcribe-03-2026")
                    .language("en")
                    .build());

    System.out.println(response);
  }
}
