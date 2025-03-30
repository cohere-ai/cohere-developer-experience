import { Cookbook } from '../types';

export const cookbooks: Cookbook[] = [
    {
        title: "Agentic Multi-Stage RAG with Cohere Tools API",
        description: "This cookbook demonstrates how to build a powerful, multi-stage agent with the Cohere platform that can retrieve documents in multiple steps.",
        imageSrc: "https://via.placeholder.com/400x200?text=Agentic+RAG",
        tags: {
          useCases: ['RAG', 'Agents', 'Tool Use'],
          endpoints: ['Chat', 'Rerank'],
          techStack: ['Langchain', 'Weaviate']
        },
        href: '/page/agentic-multi-stage-rag',
        author: {
          name: "Jason Jung",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/0803e3d-Jason_Jung.jpg"
        }
      },
      {
        title: "Agentic RAG for PDFs with mixed data",
        description: "Learn how to build a powerful, multi-step chatbot with Cohere's models that can process PDFs containing both text and tables.",
        imageSrc: "https://via.placeholder.com/400x200?text=Mixed+Data+RAG",
        tags: {
          useCases: ['RAG', 'Agents', 'Tool Use'],
          endpoints: ['Chat', 'Embed', 'Rerank'],
          techStack: ['LlamaIndex', 'Pinecone']
        },
        href: '/page/agentic-rag-mixed-data',
        author: {
          name: "Shaan Desai",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/d17fc44-Shaan.jpg"
        }
      },
      {
        title: "Analysis of Financial Forms",
        description: "Use Cohere's large language models to build an agent able to analyze financial forms like a 10-K or a 10-Q.",
        imageSrc: "https://via.placeholder.com/400x200?text=Financial+Analysis",
        tags: {
          useCases: ['RAG', 'Embeddings', 'Classification'],
          endpoints: ['Embed', 'Finetuning'],
          techStack: ['CrewAI', 'Weaviate']
        },
        href: '/page/analysis-of-financial-forms',
        author: {
          name: "Alex Barbet",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/bf2c763-Alex.jpg"
        }
      },
      {
        title: "Analyzing Hacker News with Cohere",
        description: "Build a generative-AI powered tool to analyze headlines with Cohere's language models.",
        imageSrc: "https://via.placeholder.com/400x200?text=Hacker+News+Analysis",
        tags: {
          useCases: ['Embeddings', 'Classification', 'Summarization'],
          endpoints: ['Chat', 'Rerank'],
          techStack: ['Langchain', 'LlamaIndex']
        },
        href: '/page/analyzing-hacker-news',
        author: {
          name: "Ania Bialas",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/c5dc5a3-Ania.jpg"
        }
      },
      {
        title: "Article Recommender with Text Embedding",
        description: "Build a generative-AI tool to recommend articles with Cohere's embedding and classification capabilities.",
        imageSrc: "https://via.placeholder.com/400x200?text=Article+Recommender",
        tags: {
          useCases: ['Embeddings', 'Classification', 'Search'],
          endpoints: ['Embed', 'Rerank'],
          techStack: ['Pinecone', 'CrewAI']
        },
        href: '/page/article-recommender-with-text-embeddings',
        author: {
          name: "Giannis Chatziveroglou",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/73153cb-giannis.jpeg"
        }
      },
      {
        title: "Basic Multi-Step Tool Use with Cohere",
        description: "Create a multi-step, tool-using AI agent with Cohere's tool use functionality.",
        imageSrc: "https://via.placeholder.com/400x200?text=Multi-Step+Tool+Use",
        tags: {
          useCases: ['Agents', 'Tool Use', 'Multi-step'],
          endpoints: ['Chat', 'Finetuning'],
          techStack: ['Weaviate', 'Langchain']
        },
        href: '/page/basic-multi-step',
        author: {
          name: "Komal Teru",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/7026fcc-komal-headshot.jpg"
        }
      },
      {
        title: "Basic RAG: Retrieval-Augmented Generation",
        description: "Learn how to work with Cohere's basic retrieval-augmented generation functionality.",
        imageSrc: "https://via.placeholder.com/400x200?text=Basic+RAG",
        tags: {
          useCases: ['RAG', 'Embeddings', 'Text Generation'],
          endpoints: ['Chat', 'Embed'],
          techStack: ['LlamaIndex', 'Pinecone']
        },
        href: '/page/basic-rag',
        author: {
          name: "Youran Qi",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/929cb1c-youran-headshot.jpg"
        }
      },
      {
        title: "Basic Semantic Search with Cohere Models",
        description: "Implement basic semantic search with Cohere's embedding models.",
        imageSrc: "https://via.placeholder.com/400x200?text=Semantic+Search",
        tags: {
          useCases: ['Search', 'Embeddings', 'Semantic Search'],
          endpoints: ['Embed', 'Rerank'],
          techStack: ['Weaviate', 'CrewAI']
        },
        href: '/page/basic-semantic-search',
        author: {
          name: "Mike Mao",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/d514b09-mike-headshot.jpg"
        }
      },
      {
        title: "Calendar Agent with Native Multi Step Tool",
        description: "Use Cohere Chat API with list_calendar_events and create_calendar_event tools to book appointments.",
        imageSrc: "https://via.placeholder.com/400x200?text=Calendar+Agent",
        tags: {
          useCases: ['Agents', 'Tool Use', 'Multi-step'],
          endpoints: ['Chat', 'Finetuning'],
          techStack: ['Langchain', 'LlamaIndex']
        },
        href: '/page/calendar-agent',
        author: {
          name: "Aal Patankar",
          image: "https://fern-image-hosting.s3.amazonaws.com/cohere/d48e622-Aal.jpg"
        }
      },
];
