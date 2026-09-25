import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const loader = new PDFLoader("./story.pdf")

const docs = await loader.load()

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
});

const chunks = await splitter.splitText(
    docs.map((doc) => doc.pageContent).join("\n")
)

console.log(chunks)