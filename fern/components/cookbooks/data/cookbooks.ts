import { Cookbook } from "../types";

export const cookbooks: Cookbook[] = [
  {
    title: "Agent API Calls",
    description:
      "A walkthrough of how to use Langchain cohere_react_agent to make API calls to external services that require regex.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/agent-api-calls",
    author: {
      name: "Marco Del Tredici",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/f103c96-Marco.jpg",
    },
  },
  {
    title: "Short-Term Memory Handling for Agents",
    description:
      "A walkthrough of how to use Langchain cohere_react_agent to effectively manage short-term chat history that contains tool calls with Langchain.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/agent-short-term-memory",
    author: {
      name: "Marco Del Tredici",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/f103c96-Marco.jpg",
    },
  },
  {
    title: "Agentic Multi-Stage RAG with Cohere Tools API",
    description: "How to use Agents to improve RAG performance.",
    tags: {
      capabilities: ["agents", "rag"],
      products: ["command", "embed"],
      thirdParty: [],
    },
    href: "/page/agentic-multi-stage-rag",
    author: {
      name: "Jason Jung",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/0803e3d-Jason_Jung.jpg",
    },
  },
  {
    title: "Agentic RAG for PDFs with mixed data",
    description:
      "A walkthrough of how to use Langchain cohere_react_agent to run RAG as an agent tool to handle PDFs with mixed table and text data.",
    tags: {
      capabilities: ["agents", "rag"],
      products: ["command", "embed"],
      thirdParty: ["langchain"],
    },
    href: "/page/agentic-rag-mixed-data",
    author: {
      name: "Shaan Desai",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/d17fc44-Shaan.jpg",
    },
  },
  {
    title: "Analysis of Form 10-K/10-Q Using Cohere and RAG",
    description:
      "Jumpstart financial analysis of 10-Ks or 10-Qs with Cohere's Command model and LlamaIndex tooling.",
    tags: {
      capabilities: ["summarization"],
      products: ["command", "embed"],
      thirdParty: ["langchain"],
    },
    href: "/page/analysis-of-financial-forms",
    author: {
      name: "Alex Barbet",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/bf2c763-Alex.jpg",
    },
  },
  {
    title: "Analyzing Hacker News with Cohere",
    description: "Learn how to analyze textual data using Cohere's tools.",
    tags: {
      capabilities: ["clustering"],
      products: ["embed"],
      thirdParty: ["bertopic"],
    },
    href: "/page/analyzing-hacker-news",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Multi-Step Tool Use with Cohere",
    description:
      "Multi-step tool use allows developers to connect Cohere's models to external tools like search engines, APIs, and databases.",
    tags: {
      capabilities: ["agents"],
      products: ["command", "embed"],
      thirdParty: ["langchain"],
    },
    href: "/page/basic-multi-step",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Basic RAG: Retrieval-Augmented Generation with Cohere",
    description:
      "RAG boosts the accuracy of language models by combining them with a retrieval system.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: ["langchain"],
    },
    href: "/page/basic-rag",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Basic Semantic Search with Cohere Models",
    description:
      "Learn how to build a simple semantic search engine using sentence embeddings.",
    tags: {
      capabilities: ["search"],
      products: ["embed"],
      thirdParty: [],
    },
    href: "/page/basic-semantic-search",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Getting Started with Basic Tool Use",
    description:
      "Connect large language models to external tools, like search engines, APIs, and databases, to access and utilise a wider range of data.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: [],
    },
    href: "/page/basic-tool-use",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Calendar Agent with Native Multi Step Tool",
    description:
      "A minimal working example of how to use our chat API to call tools.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: [],
    },
    href: "/page/calendar-agent",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Effective Chunking Strategies for RAG",
    description: "Explore chunking strategies for RAG systems.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: ["langchain", "llamaindex"],
    },
    href: "/page/chunking-strategies",
    author: {
      name: "Ania Bialas",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/c5dc5a3-Ania.jpg",
    },
  },
  {
    title: "Creating a QA Bot From Technical Documentation",
    description:
      "Create a chatbot that answers user questions based on technical documentation using Cohere embeddings and LlamaIndex.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: ["llamaindex"],
    },
    href: "/page/creating-a-qa-bot",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Financial CSV Agent with Native Multi-Step Cohere API",
    description:
      "This notebook demonstrates how to setup a Cohere Native API sequence of tool calls to answer questions over the income statement and balance sheet from Apple's SEC10K 2020 form.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/csv-agent-native-api",
    author: {
      name: "Jason Jung",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/0803e3d-Jason_Jung.jpg",
    },
  },
  {
    title: "Financial CSV Agent with Langchain",
    description:
      "The notebook demonstrates how to setup a Langchain Cohere ReAct Agent to answer questions over the income statement and balance sheet from Apple's SEC10K 2020 form.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/csv-agent",
    author: {
      name: "Shaan Desai",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/d17fc44-Shaan.jpg",
    },
  },
  {
    title:
      "Migrating away from deprecated create_csv_agent in langchain-cohere",
    description:
      "This page contains a tutorial on how to build a CSV agent without the deprecated 'create_csv_agent abstraction in langchain-cohere v0.3.5 and beyond.",
    tags: {
      capabilities: ["agent"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/migrate-csv-agent",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "A Data Analyst Agent Built with Cohere and Langchain",
    description:
      "Build a data analyst agent with Python and Cohere's Command R+ mode and Langchain.",
    tags: {
      capabilities: ["agent"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/data-analyst-agent",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Advanced Document Parsing For Enterprises",
    description: "Learn how to parse PDFs into text with a real-world example.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: [],
    },
    href: "/page/document-parsing-for-enterprises",
    author: {
      name: "Giannis Chatziveroglou",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/73153cb-giannis.jpeg",
    },
  },
  {
    title: "End-to-end RAG using Elasticsearch and Cohere",
    description:
      "Learn how to use Cohere and Elastic for semantic search and retrieval-augmented generation.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: ["elasticsearch"],
    },
    href: "/page/elasticsearch-and-cohere",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Serverless Semantic Search with Cohere and Pinecone",
    description:
      "Learn how to use Cohere's Embed Jobs and Pinecone's serverless solution to perform semantic search.",
    tags: {
      capabilities: ["search"],
      products: ["embed", "rerank", "datasets"],
      thirdParty: ["pinecone"],
    },
    href: "/page/embed-jobs-serverless-pinecone",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Semantic Search with Cohere Embed Jobs",
    description:
      "Learn how to use Cohere Embed Jobs to create semantic search functionality.",
    tags: {
      capabilities: ["search"],
      products: ["embed_jobs", "embed", "rerank"],
      thirdParty: [],
    },
    href: "/page/embed-jobs",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Fueling Generative Content with Keyword Research",
    description:
      "Enhance content creation with keyword-based topic clusters, generating blog ideas with Cohere's Chat model.",
    tags: {
      capabilities: ["generation", "clustering"],
      products: ["chat", "embed"],
      thirdParty: [],
    },
    href: "/page/fueling-generative-content",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Grounded Summarization Using Command R",
    description:
      "Learn how to summarise long documents with citations, reducing cost and improving latency.",
    tags: {
      capabilities: ["summarization"],
      products: ["chat", "embed"],
      thirdParty: [],
    },
    href: "/page/grounded-summarization",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Long-Form Text Strategies with Cohere",
    description:
      "Techniques to address lengthy documents exceeding the context window of LLMs.",
    tags: {
      capabilities: ["generation", "rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: [],
    },
    href: "/page/long-form-general-strategies",
    author: {
      name: "Ania Bialas",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/c5dc5a3-Ania.jpg",
    },
  },
  {
    title: "Migrating Monolithic Prompts to Command-R with RAG",
    description:
      "Command-R simplifies prompt migration to RAG, reducing hallucination and improving conciseness and grounding.",
    tags: {
      capabilities: ["generation"],
      products: ["command"],
      thirdParty: [],
    },
    href: "/page/migrating-prompts",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Multilingual Search with Cohere and Langchain",
    description: "Multilingual search with Cohere and Langchain.",
    tags: {
      capabilities: ["search"],
      products: ["command", "embed"],
      thirdParty: ["langchain"],
    },
    href: "/page/multilingual-search",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "PDF Extractor with Native Multi Step Tool Use",
    description: "How we can leverage agents to extract information from PDFs?",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: ["unstructured"],
    },
    href: "/page/pdf-extractor",
    author: {
      name: "Jason Jung",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/0803e3d-Jason_Jung.jpg",
    },
  },
  {
    title: "Deep Dive Into Evaluating RAG Outputs",
    description: "Learn how to evaluate RAG models.",
    tags: {
      capabilities: ["rag"],
      products: [],
      thirdParty: ["llamaindex"],
    },
    href: "/page/rag-evaluation-deep-dive",
    author: {
      name: "Marco Del Tredici",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/f103c96-Marco.jpg",
    },
  },
  {
    title: "RAG With Chat Embed and Rerank via Pinecone",
    description:
      "This notebook shows how to build a RAG-powered chatoot with Cohere's Chat endpoint.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: [],
    },
    href: "/page/rag-with-chat-embed",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Learn How Cohere’s Rerank Models Work",
    description:
      "Improve search results with Cohere's Relevance Endpoint, which reranks documents for better accuracy.",
    tags: {
      capabilities: ["search"],
      products: ["rerank"],
      thirdParty: [],
    },
    href: "/page/rerank-demo",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Build a SQL Agent with Cohere’s LLM Platform",
    description:
      "In this notebook we explore how to setup a Cohere ReAct Agent to answer questions over SQL Databases using Langchain's SQLDBToolkit.",
    tags: {
      capabilities: ["agents"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/sql-agent",
    author: {
      name: "Shaan Desai",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/d17fc44-Shaan.jpg",
    },
  },
  {
    title: "Evaluating Text Summarization Models",
    description:
      "This cookbook demonstrates an approach to evaluating summarization tasks using LLM evaluation.",
    tags: {
      capabilities: ["summarization"],
      products: ["command"],
      thirdParty: [],
    },
    href: "/page/summarization-evals",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Text Classification Using Embeddings",
    description:
      "Build a text classifier with Cohere embeddings. This notebook shows you how to train a sentiment analysis model with a small dataset.",
    tags: {
      capabilities: ["classification"],
      products: ["embed"],
      thirdParty: [],
    },
    href: "/page/text-classification-using-embeddings",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Topic Modeling System for AI Papers",
    description: "Topic Modeling System for AI Papers",
    tags: {
      capabilities: ["clustering"],
      products: ["embed"],
      thirdParty: [],
    },
    href: "/page/topic-modeling-ai-papers",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Wikipedia Semantic Search with Cohere + Weaviate",
    description:
      "Search 10 million Wikipedia vectors with Cohere's multilingual model and Weaviate's public dataset.",
    tags: {
      capabilities: ["search"],
      products: ["embed"],
      thirdParty: ["weaviate"],
    },
    href: "/page/wikipedia-search-with-weaviate",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Wikipedia Semantic Search with Cohere Embedding Archives",
    description:
      "Find relevant Wikipedia passages with semantic search and Cohere embeddings.",
    tags: {
      capabilities: ["search"],
      products: ["embed"],
      thirdParty: [],
    },
    href: "/page/wikipedia-semantic-search",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Build Chatbots with MongoDB and Cohere",
    description:
      "Build a chatbot that provides actionable insights on technology company market reports.",
    tags: {
      capabilities: ["rag"],
      products: ["command", "embed", "rerank"],
      thirdParty: ["mongodb"],
    },
    href: "/page/rag-cohere-mongodb",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Finetuning on Cohere’s Platform",
    description:
      "An example of finetuning using Cohere's platform and a financial dataset.",
    tags: {
      capabilities: ["finetuning"],
      products: ["command"],
      thirdParty: [],
    },
    href: "/page/convfinqa-finetuning-wandb",
    author: {
      name: "Komal Teru",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/7026fcc-komal-headshot.jpg",
    },
  },
  {
    title: "Deploy your finetuned model on AWS Marketplace",
    description: "Learn how to deploy your finetuned model on AWS Marketplace.",
    tags: {
      capabilities: ["finetuning"],
      products: ["command"],
      thirdParty: ["aws"],
    },
    href: "/page/deploy-finetuned-model-aws-marketplace",
    author: {
      name: "Youran Qi",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/929cb1c-youran-headshot.jpg",
    },
  },
  {
    title: "Finetuning Cohere Models on AWS Sagemaker",
    description:
      "Learn how to finetune one of Cohere's models on AWS Sagemaker.",
    tags: {
      capabilities: ["finetuning"],
      products: ["command"],
      thirdParty: ["aws"],
    },
    href: "/page/finetune-on-sagemaker",
    author: {
      name: "Mike Mao",
      image:
        "https://fern-image-hosting.s3.amazonaws.com/cohere/d514b09-mike-headshot.jpg",
    },
  },
  {
    title: "SQL Agent with Cohere and LangChain (i-5O Case Study)",
    description:
      "Build a SQL agent with Cohere and LangChain in the manufacturing industry.",
    tags: {
      capabilities: ["rag"],
      products: ["command"],
      thirdParty: ["langchain"],
    },
    href: "/page/sql-agent-cohere-langchain",
    author: {
      name: "",
      image: "",
    },
  },
  {
    title: "Introduction to Aya Vision",
    description:
      "Explore the capabilities of Aya Vision, which can take text and image inputs to generates text responses.",
    tags: {
      capabilities: ["multimodal"],
      products: ["aya"],
      thirdParty: [],
    },
    href: "/page/aya-vision-intro",
    author: {
      name: "",
      image: "",
    },
  },
];
