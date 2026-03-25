import { CohereClient } from 'cohere-ai';

const fs = require('fs');

const cohere = new CohereClient({});

(async () => {
  const transcription = await cohere.audio.transcriptions.create(
    fs.createReadStream('./sample.wav'),
    {
      model: 'cohere-transcribe-03-2026',
      language: 'en',
    }
  );

  console.log(transcription);
})();
