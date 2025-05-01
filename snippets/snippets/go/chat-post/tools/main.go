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

	resp, err := co.Chat(
		context.TODO(),
		&cohere.ChatRequest{
			Message: "Can you provide a sales summary for 29th September 2023, and also give me some details about the products in the 'Electronics' category, for example their prices and stock levels?",
			Tools: []*cohere.Tool{
				{
					Name:        "query_daily_sales_report",
					Description: "Connects to a database to retrieve overall sales volumes and sales information for a given day.",
					ParameterDefinitions: map[string]*cohere.ToolParameterDefinitionsValue{
						"day": {
							Description: cohere.String("Retrieves sales data for this day, formatted as YYYY-MM-DD."),
							Type:        "str",
							Required:    cohere.Bool(true),
						},
					},
				},
				{
					Name:        "query_product_catalog",
					Description: "Connects to a a product catalog with information about all the products being sold, including categories, prices, and stock levels.",
					ParameterDefinitions: map[string]*cohere.ToolParameterDefinitionsValue{
						"category": {
							Description: cohere.String("Retrieves product information data for all products in this category."),
							Type:        "str",
							Required:    cohere.Bool(true),
						},
					},
				},
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
