import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    return await co.chat(
        chat_history=[
            {"role": "USER", "message": "Who discovered gravity?"},
            {
                "role": "CHATBOT",
                "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton",
            },
        ],
        message="What year was he born?",
        # perform web search before answering the question. You can also use your own custom connector.
        connectors=[{"id": "web-search"}],
    )


asyncio.run(main())
