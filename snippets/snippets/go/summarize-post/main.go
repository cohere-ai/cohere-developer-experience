package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Summarize(
		context.TODO(),
		&cohere.SummarizeRequest{
			Text: "the quick brown fox jumped over the lazy dog and then the dog jumped over the fox the quick brown fox jumped over the lazy dog the quick brown fox jumped over the lazy dog the quick brown fox jumped over the lazy dog the quick brown fox jumped over the lazy dog",
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
