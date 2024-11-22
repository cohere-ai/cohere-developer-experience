package main

import (
	"context"
	"log"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	_, err := co.Datasets.Delete(context.TODO(), "dataset_id")

	if err != nil {
		log.Fatal(err)
	}

}
