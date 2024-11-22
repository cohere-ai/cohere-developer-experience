package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Chat(
		context.TODO(),
		&cohere.ChatRequest{
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

	log.Printf("%+v", resp)
}
