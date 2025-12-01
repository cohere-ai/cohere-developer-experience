package main

import (
	"context"
	"log"
	"os"

	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	_, err := co.Batches.Cancel(context.TODO(), "<batch_job_id>")

	if err != nil {
		log.Fatal(err)
	}
}
