import cohere

co = cohere.Client()

# tool descriptions that the model has access to
tools = [
    {
        "name": "query_daily_sales_report",
        "description": "Connects to a database to retrieve overall sales volumes and sales information for a given day.",
        "parameter_definitions": {
            "day": {
                "description": "Retrieves sales data for this day, formatted as YYYY-MM-DD.",
                "type": "str",
                "required": True,
            }
        },
    },
    {
        "name": "query_product_catalog",
        "description": "Connects to a a product catalog with information about all the products being sold, including categories, prices, and stock levels.",
        "parameter_definitions": {
            "category": {
                "description": "Retrieves product information data for all products in this category.",
                "type": "str",
                "required": True,
            }
        },
    },
]


# user request
message = "Can you provide a sales summary for 29th September 2023, and also give me some details about the products in the 'Electronics' category, for example their prices and stock levels?"

response = co.chat(
    model="command-a-03-2025",
    message=message,
    tools=tools,
)

print(response)
