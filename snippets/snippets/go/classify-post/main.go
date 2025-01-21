package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient()

	resp, err := co.Classify(
		context.TODO(),
		&cohere.ClassifyRequest{
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
