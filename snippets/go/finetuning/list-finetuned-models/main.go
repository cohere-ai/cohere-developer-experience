package main

import (
	"context"
	"log"

	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Finetuning.ListFinetunedModels(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp.FinetunedModels)
}
