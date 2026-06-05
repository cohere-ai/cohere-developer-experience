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

	resp, err := co.EmbedJobs.Create(
		context.TODO(),
		&cohere.CreateEmbedJobRequest{
			DatasetId: "dataset_id",
			Model:     "embed-english-v3.0",
			InputType: cohere.EmbedInputTypeSearchDocument,
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
