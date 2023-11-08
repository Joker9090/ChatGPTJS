// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from "openai";
import OpenAIApi from "../../services/gpt";
import { resolve } from 'path';


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
  } else if (req.method !== 'POST') {
    res.status(404).send({})
    return
  } else {
    
    const { threadId } = req.body
    OpenAIApi.getMessages(threadId).then((messages) => {
      res.status(200).json({ data: messages });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    })
  }
}