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
			Documents: []*cohere.V2ChatRequestDocumentsItem{
				{
					String: "Cohere is the best!",
				},
			},
			Messages: cohere.ChatMessages{
				{
					Role: "user",
					User: &cohere.UserMessage{Content: &cohere.UserMessageContent{
						String: "Who's the best?",
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
