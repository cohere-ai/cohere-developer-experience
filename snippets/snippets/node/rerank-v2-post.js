import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({});

(async () => {
  const rerank = await cohere.v2.rerank({
    documents: [
      'Carson City is the capital city of the American state of Nevada.',
      'The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan.',
      'Capitalization or capitalisation in English grammar is the use of a capital letter at the start of a word. English usage varies from capitalization in other languages.',
      'Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district.',
      'Capital gains are profits from the sale of an asset such as stocks or real estate. In the United States, long-term capital gains are taxed at lower rates than ordinary income.',
    ],
    query: 'What is the capital of the United States?',
    topN: 3,
    model: 'rerank-v5.0-pro',
    relevantSpans: { mode: 'enabled', threshold: 0.1, maxSpans: 3 },
  });

  console.log(rerank);
})();
