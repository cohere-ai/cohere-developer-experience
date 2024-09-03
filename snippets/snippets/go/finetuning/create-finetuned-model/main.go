package main

import (
	"context"
	"log"

	"github.com/cohere-ai/cohere-go/v2/client"
	"github.com/cohere-ai/cohere-go/v2/finetuning"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Finetuning.CreateFinetunedModel(
		context.TODO(),
		&finetuning.FinetunedModel{
			Name: "test-finetuned-model",
			Settings: &finetuning.Settings{
				DatasetId: "my-dataset-id",
				BaseModel: &finetuning.BaseModel{
					BaseType: finetuning.BaseTypeBaseTypeGenerative,
				},
			},
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp.FinetunedModel)
}
