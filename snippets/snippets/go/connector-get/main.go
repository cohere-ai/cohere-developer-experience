package main

import (
	"context"
	"log"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Connectors.Get(context.TODO(), "connector_id")

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
