package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Connectors.OAuthAuthorize(
		context.TODO(),
		"connector_id",
		&cohere.ConnectorsOAuthAuthorizeRequest{
			AfterTokenRedirect: cohere.String("https://test.com"),
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
