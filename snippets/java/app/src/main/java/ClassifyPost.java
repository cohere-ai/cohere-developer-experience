import com.cohere.api.Cohere;
import com.cohere.api.requests.ClassifyRequest;
import com.cohere.api.types.ClassifyExample;
import com.cohere.api.types.ClassifyResponse;

import java.util.List;


public class ClassifyPost {
    public static void main(String[] args) {
        Cohere cohere = Cohere.builder().clientName("snippet").build();

        ClassifyResponse response = cohere.classify(ClassifyRequest.builder().addAllInputs(
                List.of("Confirm your email address", "hey i need u to send some $")
        ).examples(List.of(
                ClassifyExample.builder().text("Dermatologists don't like her!").label("Spam").build(),
                ClassifyExample.builder().text("'Hello, open to this?'").label("Spam").build(),
                ClassifyExample.builder().text("I need help please wire me $1000 right now").label("Spam").build(),
                ClassifyExample.builder().text("Nice to know you ;)").label("Spam").build(),
                ClassifyExample.builder().text("Please help me?").label("Spam").build(),
                ClassifyExample.builder().text("Your parcel will be delivered today").label("Not spam").build(),
                ClassifyExample.builder().text("Review changes to our Terms and Conditions").label("Not spam").build(),
                ClassifyExample.builder().text("Weekly sync notes").label("Not spam").build(),
                ClassifyExample.builder().text("'Re: Follow up from today's meeting'").label("Not spam").build(),
                ClassifyExample.builder().text("Pre-read for tomorrow").label("Not spam").build()
        )).build());

        System.out.println(response);
    }
}
