import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("./story.pdf")

const docs = loader.load()

console.log(docs)