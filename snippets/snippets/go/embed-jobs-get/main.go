package main

import (
	"context"
	"log"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.EmbedJobs.Get(context.TODO(), "embed_job_id")

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
