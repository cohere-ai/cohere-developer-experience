import cohere

co = cohere.Client()

response = co.chat_stream(
    model="command-a-03-2025",
    message="Tell me about LLMs",
)

for event in response:
    if event.event_type == "text-generation":
        print(event.text, end="")
