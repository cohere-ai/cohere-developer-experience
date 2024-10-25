import com.cohere.api.Cohere;
import com.cohere.api.resources.datasets.requests.DatasetsCreateRequest;
import com.cohere.api.resources.datasets.types.DatasetsCreateResponse;
import com.cohere.api.types.DatasetType;

import java.util.Optional;


public class DatasetPost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        DatasetsCreateResponse response = cohere.datasets().create(null, Optional.empty(), DatasetsCreateRequest.builder().name("chat-dataset").type(DatasetType.CHAT_FINETUNE_INPUT).build());

        System.out.println(response);
    }
}
