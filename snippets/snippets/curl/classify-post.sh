curl --request POST \
  --url https://api.cohere.com/v1/classify \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "Authorization: bearer $CO_API_KEY" \
  --data '{
    "model": "<YOUR-FINE-TUNED-MODEL-ID>",
    "inputs": ["Confirm your email address", "hey i need u to send some $"],
    "examples": [
      {"text": "Dermatologists don'\''t like her!","label": "Spam"},
      {"text": "'\''Hello, open to this?'\''","label": "Spam"},
      {"text": "I need help please wire me $1000 right now","label": "Spam"},
      {"text": "Nice to know you ;)","label": "Spam"},
      {"text": "Please help me?","label": "Spam"},
      {"text": "Your parcel will be delivered today","label": "Not spam"},
      {"text": "Review changes to our Terms and Conditions","label": "Not spam"},
      {"text": "Weekly sync notes","label": "Not spam"},
      {"text": "'\''Re: Follow up from today'\''s meeting'\''","label": "Not spam"},
      {"text": "Pre-read for tomorrow","label": "Not spam"}
    ]
  }'