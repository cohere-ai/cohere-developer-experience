package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Datasets.List(
		context.TODO(),
		&cohere.DatasetsListRequest{})

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
