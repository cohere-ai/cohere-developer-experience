import cohere

co = cohere.Client()

response = co.chat_stream(
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

for event in response:
    if event.event_type == "text-generation":
        print(event.text, end='')
