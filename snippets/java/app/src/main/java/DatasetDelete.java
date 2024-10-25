/* (C)2024 */
import com.cohere.api.Cohere;

public class DatasetDelete {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        cohere.datasets().delete("id");
    }
}
