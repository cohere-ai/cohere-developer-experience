package main

import (
	"context"
	"log"

	"github.com/cohere-ai/cohere-go/v2/client"
	"github.com/cohere-ai/cohere-go/v2/finetuning"
)

func main() {
	co := client.NewClient()

	resp, err := co.Finetuning.CreateFinetunedModel(
		context.TODO(),
		&finetuning.FinetunedModel{
			Name: "test-finetuned-model",
			Settings: &finetuning.Settings{
				DatasetId: "my-dataset-id",
				BaseModel: &finetuning.BaseModel{
					BaseType: finetuning.BaseTypeBaseTypeChat,
				},
			},
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp.FinetunedModel)
}
