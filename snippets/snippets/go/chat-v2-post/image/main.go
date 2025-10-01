package main

import (
	"context"
	"log"
	"os"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.V2.Chat(
		context.TODO(),
		&cohere.V2ChatRequest{
			Model: "command-a-03-2025",
			Messages: cohere.ChatMessages{
				{
					Role: "user",
					User: &cohere.UserMessageV2{Content: &cohere.UserMessageV2Content{
						ContentList: []*cohere.Content{
							{Type: "text", Text: &cohere.ChatTextContent{Text: "Describe the logo!"}},
							{Type: "image_url", ImageUrl: &cohere.ImageContent{
								ImageUrl: &cohere.ImageUrl{
									// Can be either a base64 data URI or a web URL.
									Url:    "https://cohere.com/favicon-32x32.png",
									Detail: cohere.ImageUrlDetailAuto.Ptr(),
								},
							}},
						}}},
				},
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
