curl --request POST \
  --url https://api.cohere.com/v2/batches/<batch_job_id>:cancel \
  --header "Authorization: Bearer $CO_API_KEY"