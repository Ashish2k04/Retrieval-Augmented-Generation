import "dotenv/config"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone';

const embeddings = new MistralAIEmbeddings({
   apiKey: process.env.MISTRAL_API_KEY,
   model: "mistral-embed"
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
});

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const index = pc.index('rag-test')

const loader = new PDFLoader("./story.pdf") //Write any pdf file path here to load

const data = await loader.load()

const chunks = await splitter.splitText(
    data.map((doc) => doc.pageContent).join("\n")
)

const docs = await Promise.all(chunks.map(async (chunk) => {
 const embedding = await embeddings.embedQuery(chunk);
 return {
    text: chunk,
    embedding
 }
}))

const result = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

console.log(result);



