package main

import (
	"context"
	"log"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Datasets.GetUsage(context.TODO())

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
