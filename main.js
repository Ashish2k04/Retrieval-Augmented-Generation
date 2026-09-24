import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const loader = new PDFLoader("./story.pdf")

const docs = await loader.load()

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10,
    chunkOverlap: 0
});

const chunks = await splitter.splitDocuments(docs)

console.log(chunks)