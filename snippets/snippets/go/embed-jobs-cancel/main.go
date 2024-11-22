package main

import (
	"context"
	"log"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	err := co.EmbedJobs.Cancel(context.TODO(), "embed_job_id")

	if err != nil {
		log.Fatal(err)
	}

}
