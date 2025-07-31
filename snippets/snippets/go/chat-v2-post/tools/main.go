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

	resp, err := co.V2.Chat(
		context.TODO(),
		&cohere.V2ChatRequest{
			Model: "command-a-03-2025",
			Tools: []*cohere.ToolV2{
				{
					Type: cohere.String("function"),
					Function: &cohere.ToolV2Function{
						Name:        "query_daily_sales_report",
						Description: cohere.String("Connects to a database to retrieve overall sales volumes and sales information for a given day."),
						Parameters: map[string]interface{}{
							"type": "object",
							"properties": map[string]interface{}{
								"date": map[string]interface{}{
									"type":        "string",
									"description": "Retrieves sales data from this day, formatted as YYYY-MM-DD",
								},
							},
							"required": []string{"date"},
						},
					},
				},
				{
					Type: cohere.String("function"),
					Function: &cohere.ToolV2Function{
						Name:        "query_product_catalog",
						Description: cohere.String("Connects to a a product catalog with information about all the products being sold, including categories, prices, and stock levels."),
						Parameters: map[string]interface{}{
							"type": "object",
							"properties": map[string]interface{}{
								"category": map[string]interface{}{
									"type":        "string",
									"description": "Retrieves product information data for all products in this category.",
								},
							},
							"required": []string{"category"},
						},
					},
				},
			},
			Messages: cohere.ChatMessages{
				{
					Role: "user",
					User: &cohere.UserMessageV2{Content: &cohere.UserMessageV2Content{
						String: "Can you provide a sales summary for 29th September 2023, and also give me some details about the products in the 'Electronics' category, for example their prices and stock levels?",
					}},
				},
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
