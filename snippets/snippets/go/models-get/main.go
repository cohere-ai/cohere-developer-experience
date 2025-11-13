package main

import (
	"context"
	"log"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Models.Get(context.TODO(), "command-a-03-2025")

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
