import { TagCategories } from '../types';

export const ALL_TAGS: TagCategories = {
  useCases: [
    'RAG', 'Agents', 'Search', 'Embeddings', 'Tool Use',
    'Reranking', 'Fine-tuning', 'Summarization', 'Classification',
    'Text Generation', 'Multi-step', 'Semantic Search'
  ],
  endpoints: ['Chat', 'Embed', 'Rerank', 'Finetuning'],
  techStack: ['Langchain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'CrewAI']
};
