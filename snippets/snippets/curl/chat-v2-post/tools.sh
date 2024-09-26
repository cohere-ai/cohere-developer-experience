curl --request POST \
  --url https://api.cohere.com/v1/chat \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
      "model": "command-r-plus",
      "tools": [
          {
              "type": "function",
              "function": {
                  "name": "query_daily_sales_report",
                  "description": "Connects to a database to retrieve overall sales volumes and sales information for a given day.",
                  "parameters": {
                      "day": {
                          "description": "Retrieves sales data for this day, formatted as YYYY-MM-DD.",
                          "type": "str",
                          "required": true
                      }
                  }
              }
          },
          {
              "type": "function",
              "function": {
                  "name": "query_product_catalog",
                  "description": "Connects to a a product catalog with information about all the products being sold, including categories, prices, and stock levels.",
                  "parameters": {
                      "category": {
                          "description": "Retrieves product information data for all products in this category.",
                          "type": "str",
                          "required": true
                      }
                  }
              }
          }
      ],
      "messages": [
          {
              "role": "user",
              "content": "Can you provide a sales summary for 29th September 2023, and also give me some details about the products in the 'Electronics' category, for example their prices and stock levels?"
          }
      ]
  }'
