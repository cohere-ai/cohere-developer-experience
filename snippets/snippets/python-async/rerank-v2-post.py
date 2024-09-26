import cohere
import asyncio

co = cohere.AsyncClientV2("<<apiKey>>")

docs = [
    "Carson City is the capital city of the American state of Nevada.",
    "The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan.",
    "Capitalization or capitalisation in English grammar is the use of a capital letter at the start of a word. English usage varies from capitalization in other languages.",
    "Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district.",
    "Capital punishment (the death penalty) has existed in the United States since beforethe United States was a country. As of 2017, capital punishment is legal in 30 of the 50 states.",
]


async def main():
    response = await co.rerank(
        model="rerank-english-v2.0",
        query="What is the capital of the United States?",
        documents=docs,
        top_n=3,
    )
    print(response)

asyncio.run(main())
