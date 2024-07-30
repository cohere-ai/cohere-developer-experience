package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Connectors.Create(
		context.TODO(),
		&cohere.CreateConnectorRequest{
			Name: "Example connector",
			Url:  "https://you-connector-url",
			ServiceAuth: &cohere.CreateConnectorServiceAuth{
				Token: "dummy-connector-token",
				Type:  "bearer",
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
