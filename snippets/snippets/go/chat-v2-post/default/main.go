package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.V2.Chat(
		context.TODO(),
		&cohere.V2ChatRequest{
			Model: "command-r-plus-08-2024",
			Messages: cohere.ChatMessages{
				{
					Role: "user",
					User: &cohere.UserMessage{Content: &cohere.UserMessageContent{
						String: "Hello world!",
					}},
				},
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
