curl --request POST \
  --url https://api.cohere.com/v2/audio/transcriptions \
  --header "Authorization: Bearer $CO_API_KEY" \
  --form model=cohere-transcribe-03-2026 \
  --form language=en \
  --form file=@./sample.wav
