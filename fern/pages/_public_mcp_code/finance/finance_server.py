## NOTE: This code exists to provide a few ideas for creating useful functions as part of a finance-focused MCP server. It does not run on its own, and is not meant to.
## This code references three API keys: Cohere (for language model access), Alpha Vantage (for financial data), and server secret (to power the MCP server). This information is included to help you read the code below and to understand how to adapt it for your own context.

import argparse
import os
import yaml
import json
import requests
import cohere
from typing import Annotated, Optional
from pydantic import Field
from dotenv import load_dotenv

from north_mcp_python_sdk import NorthMCPServer


# Load configuration
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

# Load secrets from .env
load_dotenv(dotenv_path=config["paths"]["env_file"], override=True)

# Instantiate cohere client
client = cohere.ClientV2(
    api_key=os.getenv("COHERE_API_KEY"),
    base_url="https://stg.api.cohere.com/v1"
)

mcp = NorthMCPServer(
    "edc-demo", host="0.0.0.0", port=3001, debug=True, stateless_http=True, server_secret="secret"
)

@mcp.tool(
    name="get_company_information",
    description=config["tools"]["desc"]["get_company_information"].strip()
)
def get_company_information(
    symbol: Annotated[str, Field(description="Stock ticker symbol (e.g., 'IBM', 'AAPL')", pattern="^[A-Z]{1,5}$")]
) -> str:
    """This MCP tool retrieves comprehensive company overview data for publicly traded companies, returning detailed financial metrics, market valuation ratios, trading statistics, and company fundamentals in a single JSON response."""
    
    api_key = os.getenv("ALPHAVANTAGE_API_KEY")
    base_url = "https://www.alphavantage.co/query"
    params = {
        "function": "OVERVIEW",
        "symbol": symbol,
        "apikey": api_key
    }
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        item = {
            **data,
            "_north_metadata": {
                "title": f"{data.get('Name')} ({data.get('Symbol')})",
                "text": data.get("Description"),
                "content": data.get("Description"),
                "url": data.get("OfficialSite")
            }
        }
            
        return json.dumps(item)
    except Exception as e:
        return json.dumps({
            "response": "error",
            "message": str(e)
        })


@mcp.tool(
    name="sentiment_retriever",
    description=config["tools"]["desc"]["sentiment_retriever"].strip()
)
def sentiment_retriever(
    symbol: Annotated[str, Field(description="Stock ticker symbol (e.g., 'IBM', 'AAPL')", pattern="^[A-Z]{1,5}$")],
    time_from: Annotated[Optional[str], Field(description="The starting time for the time range of the news articles in YYYYMMDDTHHMM format. For example: '20220410T0130'", default=None)],
    time_to: Annotated[Optional[str], Field(description="The ending time for the time range of the news articles in YYYYMMDDTHHMM format. For example: '20220410T0130'", default=None)]
) -> str:
    """Returns live and historical market news & sentiment data from a large & growing selection of premier news outlets around the world, covering stocks, cryptocurrencies, forex, and a wide range of topics."""
        
    params = {
        "apikey": os.getenv("ALPHAVANTAGE_API_KEY")
    }
    url = (
        f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT"
        f"&tickers={symbol}"
        f"&time_from={time_from}"
        f"&time_to={time_to}"
        f"&sort=LATEST"
        f"&limit=10"
    )
    try:
        response = requests.get(
            url=url,
            params=params,
        )
        response.raise_for_status()
        data = response.json()
        feed = data.get("feed")

        items = []
        for item in feed:
            enhanced_item = {
                **item,
                "_north_metadata": {
                    "title": item.get("title"),
                    "content": item.get("summary"),
                    "text": item.get("summary"),
                    "url": item.get("url"),
                }
            }
            items.append(enhanced_item)
        return json.dumps(items)
    except Exception as e:
        return json.dumps({
            "response": "error",
            "message": str(e)
        })


@mcp.tool(
    name="earnings_call_retriever",
    description=config["tools"]["desc"]["earnings_call_retriever"].strip()
)
def earnings_call_retriever(
    symbol: Annotated[str, Field(description="Stock ticker symbol (e.g., 'IBM', 'AAPL')", pattern="^[A-Z]{1,5}$")],
    quarter: Annotated[str, Field(description="Quarter in YYYYQM format (e.g., '2024Q3')", pattern="^\\d{4}Q[1-4]$")],
    query: Annotated[str, Field(description="Search query to find relevant content within the transcript", min_length=1)],
    top_n: Annotated[Optional[int], Field(description="Number of top results to return based on relevance ranking", default=10)]
) -> str:
    """This MCP tool retrieves and searches earnings call transcripts for publicly traded companies, allowing users to find specific information within transcript content."""

    params = {
        "apikey": os.getenv("ALPHAVANTAGE_API_KEY")
    }
    url = (
        f"https://www.alphavantage.co/query?function=EARNINGS_CALL_TRANSCRIPT"
        f"&symbol={symbol}"
        f"&quarter={quarter}"
    )
    try:
        response = requests.get(
            url=url,
            params=params,
        )
        response.raise_for_status()
        data = response.json()
        feed = data.get("transcript")

        # Rerank on feed using the query
        ranked_feed = client.rerank(
            query=query,
            model="rerank-v3.5",
            documents=[json.dumps(s) for s in feed],
            top_n=top_n
        ).results

        idx = [res.index for res in ranked_feed]
        # Extract items using the indices
        ranked_items = [feed[i] for i in idx]

        items = []
        for item in ranked_items:
            enhanced_item = {
                **item,
                "_north_metadata": {
                    "title": f"{item.get('speaker')} - {item.get('title')}",
                    "text": item.get("content"),
                    "url": "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025"
                }
            }
            items.append(enhanced_item)
        return json.dumps(items)
    except Exception as e:
        return json.dumps({
            "response": "error",
            "message": str(e)
        })


@mcp.tool(
    name="fx_daily_data",
    description=config["tools"]["desc"]["fx_daily_data"].strip()
)
def fx_daily_data(
    from_symbol: Annotated[str, Field(description="Three-letter source currency symbol (e.g., 'EUR', 'USD', 'GBP')", pattern="^[A-Z]{3}$")],
    to_symbol: Annotated[str, Field(description="Three-letter target currency symbol (e.g., 'USD', 'EUR', 'JPY')", pattern="^[A-Z]{3}$")],
    outputsize: Annotated[Optional[str], Field(description="Data size: 'compact' for latest 30 data points, 'full' for complete time series", default="compact")],
) -> str:
    """This MCP tool retrieves daily foreign exchange (FX) time series data including timestamp, open, high, low, and close prices for specified currency pairs, updated in real-time."""
    
    api_key = os.getenv("ALPHAVANTAGE_API_KEY")
    base_url = "https://www.alphavantage.co/query"
    params = {
        "function": "FX_DAILY",
        "from_symbol": from_symbol,
        "to_symbol": to_symbol,
        "outputsize": outputsize,
        "datatype": "json",
        "apikey": api_key
    }

    LIMIT = 30 if outputsize == "compact" else 60
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        # Handle the time series data
        time_series_key = "Time Series FX (Daily)"
        if time_series_key not in data:
            return json.dumps({
                "response": "error",
                "message": "Time series data not found in response"
            })
        
        time_series = data[time_series_key]
        metadata = data.get("Meta Data", {})
        
        # Convert time series to a list of enhanced items
        items = []
        for date, values in time_series.items():
            enhanced_item = {
                "date": date,
                "close": values.get("4. close"),
                "_north_metadata": {
                    "title": f"{from_symbol}/{to_symbol} - {date}",
                    "text": f"Close: {values.get('4. close')}",
                    "content": f"FX data for {from_symbol} to {to_symbol} on {date}: Close {values.get('4. close')}",
                }
            }
            items.append(enhanced_item)
        
        # Include metadata in the response
        result = {
            "metadata": metadata,
            "data": items[:LIMIT]
        }
        
        return json.dumps(result)
    except Exception as e:
        return json.dumps({
            "response": "error",
            "message": str(e)
        })


@mcp.tool(
    name="currency_exchange_rate",
    description=config["tools"]["desc"]["currency_exchange_rate"].strip()
)
def currency_exchange_rate(
    from_currency: Annotated[str, Field(description="Three-letter source currency code (e.g., 'USD', 'EUR', 'GBP')", pattern="^[A-Z]{3}$")],
    to_currency: Annotated[str, Field(description="Three-letter destination currency code (e.g., 'EUR', 'USD', 'JPY')", pattern="^[A-Z]{3}$")]
) -> str:
    """This MCP tool retrieves real-time exchange rates between physical currencies, providing current conversion rates and metadata."""
    
    api_key = os.getenv("ALPHAVANTAGE_API_KEY")
    base_url = "https://www.alphavantage.co/query"
    params = {
        "function": "CURRENCY_EXCHANGE_RATE",
        "from_currency": from_currency,
        "to_currency": to_currency,
        "apikey": api_key
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        # Handle the exchange rate data
        exchange_rate_key = "Realtime Currency Exchange Rate"
        if exchange_rate_key not in data:
            return json.dumps({
                "response": "error",
                "message": "Exchange rate data not found in response"
            })
        
        exchange_data = data[exchange_rate_key]
        
        # Create enhanced response with metadata
        result = {
            "from_currency": exchange_data.get("1. From_Currency Code"),
            "from_currency_name": exchange_data.get("2. From_Currency Name"),
            "to_currency": exchange_data.get("3. To_Currency Code"),
            "to_currency_name": exchange_data.get("4. To_Currency Name"),
            "exchange_rate": exchange_data.get("5. Exchange Rate"),
            "last_refreshed": exchange_data.get("6. Last Refreshed"),
            "time_zone": exchange_data.get("7. Time Zone"),
            "bid_price": exchange_data.get("8. Bid Price"),
            "ask_price": exchange_data.get("9. Ask Price"),
            "_north_metadata": {
                "title": f"{from_currency} to {to_currency} Exchange Rate",
                "text": f"1 {from_currency} = {exchange_data.get('5. Exchange Rate')} {to_currency}",
                "content": f"Current exchange rate from {exchange_data.get('2. From_Currency Name')} ({from_currency}) to {exchange_data.get('4. To_Currency Name')} ({to_currency}): {exchange_data.get('5. Exchange Rate')}. Last updated: {exchange_data.get('6. Last Refreshed')}",
                "url": f"https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency={from_currency}&to_currency={to_currency}"
            }
        }
        
        return json.dumps(result)
    except Exception as e:
        return json.dumps({
            "response": "error",
            "message": str(e)
        })


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run the MCP server with configurable transport."
    )
    parser.add_argument(
        "--transport",
        choices=["streamable-http", "stdio", "sse"],
        default="sse",
        help="Transport method to use (default: sse)",
    )
    args = parser.parse_args()

    mcp.run(transport="streamable-http")