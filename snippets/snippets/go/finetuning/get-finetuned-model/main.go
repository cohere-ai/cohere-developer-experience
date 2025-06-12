package main

import (
	"context"
	"log"
	"os"

	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.Finetuning.GetFinetunedModel(context.TODO(), "test-id")
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp.FinetunedModel)
}
