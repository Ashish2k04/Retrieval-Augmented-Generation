import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { load } from "@langchain/community/load";

const loader = new PDFLoader("./story.pdf")

const docs = loader.load()

console.log(docs)