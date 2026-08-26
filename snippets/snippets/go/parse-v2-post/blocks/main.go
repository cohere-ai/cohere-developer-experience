//go:build ignore
// +build ignore

package main

import (
	"context"
	"log"
	"os"

	cohere "github.com/cohere-ai/cohere-go/v2"
	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.V2.Parse(
		context.TODO(),
		&cohere.ParseRequest{
			Model: "parse-v5.0",
			Document: &cohere.ParseDocument{
				ImageUrl: "https://cohere.com/favicon-32x32.png",
			},
			OutputFormat: cohere.ParseOutputFormatBlocks.Ptr(),
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
