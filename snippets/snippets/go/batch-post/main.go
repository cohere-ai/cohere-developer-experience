package main

import (
	"context"
	"log"
	"os"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.Batches.Create(
		context.TODO(),
		&cohere.Batch{
			Name:           "<batch_job_name>",
			InputDatasetId: "<input_dataset_id>",
			Model:          "<model_name>",
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
