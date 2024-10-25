package main

import (
	"context"
	"errors"
	"io"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.ChatStream(
		context.TODO(),
		&cohere.ChatStreamRequest{
			ChatHistory: []*cohere.Message{
				{
					Role: "USER",
					User: &cohere.ChatMessage{
						Message: "Who discovered gravity?",
					},
				},
				{
					Role: "CHATBOT",
					Chatbot: &cohere.ChatMessage{
						Message: "The man who is widely credited with discovering gravity is Sir Isaac Newton",
					},
				}},
			Message: "What year was he born?",
			Connectors: []*cohere.ChatConnector{
				{Id: "web-search"},
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

		if message.TextGeneration != nil {
			log.Printf("%+v", resp)
		}
	}

}
