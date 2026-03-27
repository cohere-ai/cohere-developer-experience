import { CohereClientV2 } from 'cohere-ai';
import fs from 'fs';

const cohere = new CohereClientV2({});

(async () => {
  const fileBuffer = fs.readFileSync('./sample.wav');
  const file = new File([fileBuffer], 'sample.wav');

  const response = await cohere.audio.transcriptions.create(file, {
    model: 'cohere-transcribe-03-2026',
    language: 'en',
  });

  console.log(response.text);
})();
