package main

import (
	"context"
	"log"

	"github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Finetuning.ListTrainingStepMetrics(
		context.TODO(),
		"test-finetuned-model-id",
		nil,
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp.StepMetrics)
}
