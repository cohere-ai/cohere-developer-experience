import cohere
import asyncio

co = cohere.AsyncClient()


async def main():
    await co.embed_jobs.cancel("job_id")
