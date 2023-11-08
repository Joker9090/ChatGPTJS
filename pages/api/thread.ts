// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from "openai";
import OpenAIApi from "../../services/gpt";


type Data = {
  data?: any,
  error?: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'OPTIONS') {
    res.status(200).send({})
    return
  } else if (req.method !== 'GET') {
    res.status(404).send({})
    return
  } else {
    OpenAIApi.createThread().then((response) => {
      console.log(response);
      res.status(200).json({ data: response });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    })
  }

}



