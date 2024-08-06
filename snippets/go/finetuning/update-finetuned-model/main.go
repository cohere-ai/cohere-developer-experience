package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Finetuning.UpdateFinetunedModel(
		context.TODO(),
		"test-id",
		&cohere.FinetuningUpdateFinetunedModelRequest{
			Name: "new-name",
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp.FinetunedModel)
}
