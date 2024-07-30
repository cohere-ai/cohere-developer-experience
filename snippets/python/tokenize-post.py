import cohere

co = cohere.Client("<<apiKey>>")

response = co.tokenize(text="tokenize me! :D", model="command")  # optional
print(response)
