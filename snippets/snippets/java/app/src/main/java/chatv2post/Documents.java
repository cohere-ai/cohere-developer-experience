/* (C)2024 */
package chatv2post;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2ChatRequest;
import com.cohere.api.resources.v2.types.V2ChatRequestDocumentsItem;
import com.cohere.api.types.*;
import java.util.List;

public class Documents {
  public static void main(String[] args) {
    Cohere cohere = Cohere.builder().token("<<apiKey>>").clientName("snippet").build();

    ChatResponse response =
        cohere
            .v2()
            .chat(
                V2ChatRequest.builder()
                    .model("command-r-plus")
                    .messages(
                        List.of(
                            ChatMessageV2.user(
                                UserMessage.builder()
                                    .content(
                                        UserMessageContent.of("Who is" + " the most" + " popular?"))
                                    .build())))
                    .documents(
                        List.of(
                            V2ChatRequestDocumentsItem.of(
                                "↓ Skip to Main Content\n\n"
                                    + "Music industry – One step"
                                    + " closer to being"
                                    + " accurate\n\n"
                                    + "CSPC: Backstreet Boys"
                                    + " Popularity Analysis\n\n"
                                    + "Hernán Lopez Posted on"
                                    + " February 9, 2017 Posted in"
                                    + " CSPC 72 Comments Tagged"
                                    + " with Backstreet Boys, Boy"
                                    + " band\n\n"
                                    + "At one point, Backstreet"
                                    + " Boys defined success:"
                                    + " massive albums sales across"
                                    + " the globe, great singles"
                                    + " sales, plenty of chart"
                                    + " topping releases, hugely"
                                    + " hyped tours and tremendous"
                                    + " media coverage.\n\n"
                                    + "It is true that they"
                                    + " benefited from"
                                    + " extraordinarily good market"
                                    + " conditions in all markets."
                                    + " After all, the all-time"
                                    + " record year for the music"
                                    + " business, as far as"
                                    + " revenues in billion dollars"
                                    + " are concerned, was actually"
                                    + " 1999. That is, back when"
                                    + " this five men group was at"
                                    + " its peak."),
                            V2ChatRequestDocumentsItem.of(
                                "↓ Skip to Main Content\n\n"
                                    + "Music industry – One step"
                                    + " closer to being"
                                    + " accurate\n\n"
                                    + "CSPC: NSYNC Popularity"
                                    + " Analysis\n\n"
                                    + "MJD Posted on February 9,"
                                    + " 2018 Posted in CSPC 27"
                                    + " Comments Tagged with Boy"
                                    + " band, N'Sync\n\n"
                                    + "At the turn of the"
                                    + " millennium three teen acts"
                                    + " were huge in the US, the"
                                    + " Backstreet Boys, Britney"
                                    + " Spears and NSYNC. The"
                                    + " latter is the only one we"
                                    + " haven’t study so far. It"
                                    + " took 15 years and Adele to"
                                    + " break their record of 2,4"
                                    + " million units sold of No"
                                    + " Strings Attached in its"
                                    + " first week alone.\n\n"
                                    + "It wasn’t a fluke, as the"
                                    + " second fastest selling"
                                    + " album of the Soundscan era"
                                    + " prior 2015, was also theirs"
                                    + " since Celebrity debuted"
                                    + " with 1,88 million units"
                                    + " sold."),
                            V2ChatRequestDocumentsItem.of(
                                " 1997, 1998, 2000 and 2001 also"
                                    + " rank amongst some of the"
                                    + " very best years.\n\n"
                                    + "Yet the way many music"
                                    + " consumers – especially"
                                    + " teenagers and young women’s"
                                    + " – embraced their output"
                                    + " deserves its own chapter."
                                    + " If Jonas Brothers and more"
                                    + " recently One Direction"
                                    + " reached a great level of"
                                    + " popularity during the past"
                                    + " decade, the type of success"
                                    + " achieved by Backstreet Boys"
                                    + " is in a completely"
                                    + " different level as they"
                                    + " really dominated the"
                                    + " business for a few years"
                                    + " all over the world,"
                                    + " including in some countries"
                                    + " that were traditionally"
                                    + " hard to penetrate for"
                                    + " Western artists.\n\n"
                                    + "We will try to analyze the"
                                    + " extent of that hegemony"
                                    + " with this new article with"
                                    + " final results which will"
                                    + " more than surprise many"
                                    + " readers."),
                            V2ChatRequestDocumentsItem.of(
                                " Was the teen group led by Justin"
                                    + " Timberlake really that big?"
                                    + " Was it only in the US where"
                                    + " they found success? Or were"
                                    + " they a global"
                                    + " phenomenon?\n\n"
                                    + "As usual, I’ll be using the"
                                    + " Commensurate Sales to"
                                    + " Popularity Concept in order"
                                    + " to relevantly gauge their"
                                    + " results. This concept will"
                                    + " not only bring you sales"
                                    + " information for all NSYNC‘s"
                                    + " albums, physical and"
                                    + " download singles, as well"
                                    + " as audio and video"
                                    + " streaming, but it will also"
                                    + " determine their true"
                                    + " popularity. If you are not"
                                    + " yet familiar with the CSPC"
                                    + " method, the next page"
                                    + " explains it with a short"
                                    + " video. I fully recommend"
                                    + " watching the video before"
                                    + " getting into the sales"
                                    + " figures.")))
                    .build());
    System.out.println(response);
  }
}
