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

	resp, err := co.GenerateStream(
		context.TODO(),
		&cohere.GenerateStreamRequest{
			Prompt: "Please explain to me how LLMs work",
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
