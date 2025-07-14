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
			Model: "command-r-plus",
			Documents: []*cohere.V2ChatStreamRequestDocumentsItem{
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
	defer resp.Close()

	for {
		message, err := resp.Recv()

		if errors.Is(err, io.EOF) {
			// An io.EOF error means the server is done sending messages
			// and should be treated as a success.
			break
		}

		// Log the received message
		if message.ContentDelta != nil {
			log.Printf("%+v", message)
		}
	}
}
