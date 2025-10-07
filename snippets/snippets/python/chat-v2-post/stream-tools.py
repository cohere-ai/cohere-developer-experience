import cohere

co = cohere.ClientV2()

response = co.chat_stream(
    model="command-a-03-2025",
    messages=[
        {
            "role": "user",
            "content": "Can you provide a sales summary for 29th September 2023, and also give me some details about the products in the 'Electronics' category, for example their prices and stock levels?",
        }
    ],
    tools=[
        cohere.ToolV2(
            type="function",
            function={
                "name": "query_daily_sales_report",
                "description": "Connects to a database to retrieve overall sales volumes and sales information for a given day.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "day": {
                            "description": "Retrieves sales data for this day, formatted as YYYY-MM-DD.",
                            "type": "string",
                        }
                    },
                    "required": ["day"],
                },
            },
        ),
        cohere.ToolV2(
            type="function",
            function={
                "name": "query_product_catalog",
                "description": "Connects to a product catalog with information about all the products being sold, including categories, prices, and stock levels.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "description": "Retrieves product information data for all products in this category.",
                            "type": "string",
                        }
                    },
                    "required": ["category"],
                },
            },
        ),
    ],
)

for event in response:
    if event.type in ["tool-call-start", "tool-call-delta"]:
        for tool_call in event.delta.message.tool_calls:
            print(tool_call)
