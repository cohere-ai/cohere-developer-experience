curl --request POST \
  --url "https://api.cohere.com/v1/datasets?name=my-dataset&type=embed-input" \
  --header 'Content-Type: multipart/form-data' \
  --header "Authorization: Bearer $CO_API_KEY" \
  --form file=@./path/to/file.jsonl