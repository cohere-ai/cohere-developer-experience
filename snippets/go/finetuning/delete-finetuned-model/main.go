package main

import (
	"context"
	"log"

	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	_, err := co.Finetuning.DeleteFinetunedModel(context.TODO(), "test-id")
	if err != nil {
		log.Fatal(err)
	}
}
