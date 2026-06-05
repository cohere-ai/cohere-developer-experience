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
	model := "<YOUR-FINE-TUNED-MODEL-ID>"

	resp, err := co.Classify(
		context.TODO(),
		&cohere.ClassifyRequest{
			Model: &model,
			Examples: []*cohere.ClassifyExample{
				{
					Text:  cohere.String("orange"),
					Label: cohere.String("fruit"),
				},
				{
					Text:  cohere.String("pear"),
					Label: cohere.String("fruit"),
				},
				{
					Text:  cohere.String("lettuce"),
					Label: cohere.String("vegetable"),
				},
				{
					Text:  cohere.String("cauliflower"),
					Label: cohere.String("vegetable"),
				},
			},
			Inputs: []string{"peach"},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
