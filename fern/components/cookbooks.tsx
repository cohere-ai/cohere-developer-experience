import React, { useState, useEffect } from 'react';

interface TagCategories {
  useCases: string[];
  endpoints: string[];
  techStack: string[];
}

const ALL_TAGS: TagCategories = {
  useCases: [
    'RAG', 'Agents', 'Search', 'Embeddings', 'Tool Use', 
    'Reranking', 'Fine-tuning', 'Summarization', 'Classification',
    'Text Generation', 'Multi-step', 'Semantic Search'
  ],
  endpoints: ['Chat', 'Embed', 'Rerank', 'Finetuning'],
  techStack: ['Langchain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'CrewAI']
};

interface Cookbook {
  title: string;
  description: string;
  imageSrc: string;
  tags: {
    useCases: string[];
    endpoints: string[];
    techStack: string[];
  };
  href: string;
  author?: {
    name: string;
    image: string;
  };
}

const CARD_COLORS = ['bg-[#EEF0EF]', 'bg-[#FDF2F0]', 'bg-[#F8F1F9]', 'bg-[#F0F2FB]'];

// Replace the existing tag style constants with these:
const tagButtonClass = "px-2 py-1 text-[12px] rounded-full transition-colors cursor-pointer font-normal";

const selectedTagClass = "bg-[#333293] text-white hover:bg-[#333293]/90";
const unselectedTagClass = "bg-white text-[#666666] border border-[#E5E5E5] hover:bg-gray-50";

export const Cookbooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<{
    useCases: string[];
    endpoints: string[];
    techStack: string[];
  }>({
    useCases: [],
    endpoints: [],
    techStack: []
  });

  // Base cookbook data
  const baseCookbooks: Cookbook[] = [
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

  // Create an array of 27 cookbooks by spreading the base cookbooks three times
  const cookbooks: Cookbook[] = [
    ...baseCookbooks,
    ...baseCookbooks.map(cookbook => ({
      ...cookbook,
      href: `${cookbook.href}-2`, // Add suffix to make hrefs unique
    })),
    ...baseCookbooks.map(cookbook => ({
      ...cookbook,
      href: `${cookbook.href}-3`, // Add suffix to make hrefs unique
    }))
  ];

  // Filter cookbooks based on search query and selected tags
  const filteredCookbooks = cookbooks.filter(cookbook => {
    const matchesQuery = searchQuery === '' || 
      cookbook.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUseCases = selectedTags.useCases.length === 0 || 
      selectedTags.useCases.every(tag => cookbook.tags.useCases.includes(tag));
    
    const matchesEndpoints = selectedTags.endpoints.length === 0 || 
      selectedTags.endpoints.every(tag => cookbook.tags.endpoints.includes(tag));
    
    const matchesTechStack = selectedTags.techStack.length === 0 || 
      selectedTags.techStack.every(tag => cookbook.tags.techStack.includes(tag));

    return matchesQuery && matchesUseCases && matchesEndpoints && matchesTechStack;
  });

  // Function to get random color from array
  const getRandomColor = (index: number) => {
    return CARD_COLORS[index % CARD_COLORS.length];
  };

  // Helper function to check if a tag is selected
  const isTagSelected = (category: keyof TagCategories, tag: string) => {
    return selectedTags[category].includes(tag);
  };

  // Helper function to toggle a tag
  const toggleTag = (category: keyof TagCategories, tag: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [category]: prev[category].includes(tag)
        ? prev[category].filter(t => t !== tag)
        : [...prev[category], tag]
    }));
  };

  return (
    <div className="w-full">
      {/* Sidebar and main content container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            {/* Use Cases */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Use Cases</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.useCases.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag('useCases', tag)}
                    className={`${tagButtonClass} ${
                      isTagSelected('useCases', tag) ? selectedTagClass : unselectedTagClass
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoints */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Endpoints</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.endpoints.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag('endpoints', tag)}
                    className={`${tagButtonClass} ${
                      isTagSelected('endpoints', tag) ? selectedTagClass : unselectedTagClass
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.techStack.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag('techStack', tag)}
                    className={`${tagButtonClass} ${
                      isTagSelected('techStack', tag) ? selectedTagClass : unselectedTagClass
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCookbooks.map((cookbook, index) => (
              <a
                key={index}
                href={cookbook.href}
                className={`block border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${getRandomColor(index)}`}
              >
                <div className="p-6">
                  <h3 className="text-base font-medium text-gray-800 mb-3">{cookbook.title}</h3>
                  
                  {cookbook.author && (
                    <div className="flex items-center mb-4">
                      <img 
                        src={cookbook.author.image} 
                        alt={cookbook.author.name}
                        className="w-5 h-5 rounded-full mr-2"
                      />
                      <span className="text-xs text-gray-600">{cookbook.author.name}</span>
                    </div>
                  )}
                  
                  {/* Display only endpoint tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {cookbook.tags.endpoints.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-1.5 py-0.5 text-[10px] text-gray-600 bg-white/50 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 