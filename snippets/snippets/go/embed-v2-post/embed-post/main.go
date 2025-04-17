package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.V2.Embed(
		context.TODO(),
		&cohere.V2EmbedRequest{
			Texts:          []string{"hello", "goodbye"},
			Model:          "embed-v4.0",
			InputType:      cohere.EmbedInputTypeSearchDocument,
			EmbeddingTypes: []cohere.EmbeddingType{cohere.EmbeddingTypeFloat},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
