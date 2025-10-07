package main

import (
	"context"
	"errors"
	"io"
	"log"
	"os"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.V2.ChatStream(
		context.TODO(),
		&cohere.V2ChatStreamRequest{
			Model: "command-a-vision-07-2025",
			Messages: cohere.ChatMessages{
				{
					Role: "user",
					User: &cohere.UserMessageV2{
						Content: &cohere.UserMessageV2Content{
							ContentList: []*cohere.Content{
								{Type: "text", Text: &cohere.ChatTextContent{Text: "Describe this image"}},
								{Type: "image_url", ImageUrl: &cohere.ImageContent{
									ImageUrl: &cohere.ImageUrl{
										// Can be either a base64 data URI or a web URL.
										Url:    "https://cohere.com/favicon-32x32.png",
										Detail: cohere.ImageUrlDetailAuto.Ptr(),
									},
								}},
							},
						},
					},
				},
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	// Make sure to close the stream when you're done reading.
	// This is easily handled with defer.
	defer resp.Close()

	for {
		message, err := resp.Recv()

		if errors.Is(err, io.EOF) {
			// An io.EOF error means the server is done sending messages
			// and should be treated as a success.
			break
		}

		if message.ContentDelta != nil {
			log.Printf("%+v", message)
		}
	}
}
