package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Embed(
		context.TODO(),
		&cohere.EmbedRequest{
			Texts:     []string{"hello", "goodbye"},
			Model:     cohere.String("embed-english-v3.0"),
			InputType: cohere.EmbedInputTypeSearchDocument.Ptr(),
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
