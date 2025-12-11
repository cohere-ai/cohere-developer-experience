curl --request GET \
  --url https://api.cohere.com/v2/batches/<batch_job_id> \
  --header 'accept: application/json' \
  --header "Authorization: Bearer $CO_API_KEY"