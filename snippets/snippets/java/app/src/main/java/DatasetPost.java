import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.requests.DatasetsCreateRequest;
import com.cohere.api.resources.datasets.types.DatasetsCreateResponse;
import com.cohere.api.types.DatasetType;

import java.util.Optional;


public class DatasetPost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

        DatasetsCreateResponse response = cohere.datasets().create(null, Optional.empty(), DatasetsCreateRequest.builder().name("prompt-completion-dataset").type(DatasetType.PROMPT_COMPLETION_FINETUNE_INPUT).build());

        System.out.println(response);
    }
}
