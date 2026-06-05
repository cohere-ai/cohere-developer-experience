package main

import (
	"context"
	"log"
	"os"

	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	_, err := co.Finetuning.DeleteFinetunedModel(context.TODO(), "test-id")
	if err != nil {
		log.Fatal(err)
	}
}
