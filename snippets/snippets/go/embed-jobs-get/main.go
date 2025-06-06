package main

import (
	"context"
	"log"
	"os"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.EmbedJobs.Get(context.TODO(), "embed_job_id")

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
