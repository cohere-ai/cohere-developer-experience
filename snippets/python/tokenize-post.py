import cohere

co = cohere.Client()

response = co.tokenize(text="tokenize me! :D", model="command")  # optional
print(response)
