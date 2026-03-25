import asyncio
import cohere

co = cohere.AsyncClientV2()


async def main():
    transcription = await co.audio.transcriptions.create(
        model="cohere-transcribe-03-2026",
        language="en",
        file=open("./sample.wav", "rb"),
    )

    print(transcription)


asyncio.run(main())
