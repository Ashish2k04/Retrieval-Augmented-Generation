import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("./story.pdf")

loader.load()
.then((res)=>{
    console.log(res)
})
