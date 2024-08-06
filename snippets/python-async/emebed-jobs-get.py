import cohere
import asyncio

co = cohere.AsyncClient("<<apiKey>>")


async def main():
    response = await co.embed_jobs.get("job_id")

    print(response)

asyncio.run(main())
