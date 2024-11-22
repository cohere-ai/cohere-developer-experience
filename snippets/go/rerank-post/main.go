package main

import (
	"context"
	"log"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken("<<apiKey>>"))

	resp, err := co.Rerank(
		context.TODO(),
		&cohere.RerankRequest{
			Query: "What is the capital of the United States?",
			Documents: []*cohere.RerankRequestDocumentsItem{
				{String: "Carson City is the capital city of the American state of Nevada."},
				{String: "The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan."},
				{String: "Capitalization or capitalisation in English grammar is the use of a capital letter at the start of a word. English usage varies from capitalization in other languages."},
				{String: "Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district."},
			},
			Model: cohere.String("rerank-english-v3.0"),
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
