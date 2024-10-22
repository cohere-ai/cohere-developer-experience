import cohere

co = cohere.Client("<<apiKey>>")

response = co.tokenize(text="tokenize me! :D", model="command-r-plus-08-2024")  # optional
print(response)
