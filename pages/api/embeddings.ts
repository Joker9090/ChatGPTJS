import {
    saveVectorData,
    searchVectorData,
    toEmbeddings,
  } from "@/services/pinecone";
  import type { NextApiRequest, NextApiResponse } from "next";
  
  type Data = {
    data?: any;
    error?: string;
  };
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    if (req.method === "OPTIONS") {
      res.status(200).send({});
      return;
    } else if (req.method !== "POST") {
      res.status(404).send({});
      return;
    } else {
      const { search } = req.body;
      // const data = [
      //   {
      //     "id": 1,
      //     "content": "Parrafo 1"
      //   },
      //   {
      //     "id": 2,
      //     "content": "Parrafo 2"
      //   },
      //   {
      //     "id": 3,
      //     "content": "Parrafo 3"
      //   },
      //   {
      //     "id": 4,
      //     "content": "Parrafo 4"
      //   }
      // ]
      // for (let infoPart of data) {
      //   await saveVectorData(infoPart);
      // }
      const searchEmbeddingsRes = await toEmbeddings(search);
      const searchEmbedding = searchEmbeddingsRes.data[0].embedding;
      console.log(`Search embeddings: ${searchEmbedding}`);
      const results = await searchVectorData(searchEmbedding);
      console.log(`Contenido: ${results}`);
      res.status(200).send({ data: results });
    }
  }
  