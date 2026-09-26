import "dotenv/config";
import { Pinecone } from '@pinecone-database/pinecone';
import { MistralAIEmbeddings } from "@langchain/mistralai";

const embeddings = new MistralAIEmbeddings({
   apiKey: process.env.MISTRAL_API_KEY,
   model: "mistral-embed"
})

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const index = pc.index('rag-test')

const queryEmbeding = await embeddings.embedQuery("Who is Pebble in the story?")

const result = await index.query({
    vector: queryEmbeding,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(result));

