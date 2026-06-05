import cohere

co = cohere.ClientV2()

transcription = co.audio.transcriptions.create(
    model="cohere-transcribe-03-2026",
    language="en",
    file=open("./sample.wav", "rb"),
)

print(transcription)
