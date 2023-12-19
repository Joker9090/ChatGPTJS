import OpenAIApi from "../services/gpt";
import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: `${process.env.PINECONE_API_KEY}`,
  environment: `${process.env.PINECONE_ENVIRONMENT}`,
});
const pineconeIndex = pinecone.index("test");

export const toEmbeddings = async (text: string) => {
  return await OpenAIApi.createEmbedding([text]);
};

export const saveVectorData = async (data: { id: number; content: string }) => {
  const { id, content } = data;
  const embeddingResponse = await OpenAIApi.createEmbedding(data.content);
  const objectToSave = {
    id: id + "",
    metadata: {
      content,
    },
    values: embeddingResponse.data[0].embedding,
  };
  return pineconeIndex.upsert([objectToSave]);
};

export const searchVectorData = async (embedding: number[]) => {
  return pineconeIndex.query({
    vector: embedding,
    topK: 10,
    includeMetadata: true,
  });
};
