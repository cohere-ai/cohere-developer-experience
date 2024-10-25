/* (C)2024 */
package finetuning;

import com.cohere.api.Cohere;
import com.cohere.api.resources.finetuning.finetuning.types.ListEventsResponse;

public class ListEvents {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        ListEventsResponse response = cohere.finetuning().listEvents("test-id");

        System.out.println(response);
    }
}
