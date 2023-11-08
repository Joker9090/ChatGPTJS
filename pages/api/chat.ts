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
    
    const { threadId, text, instructions, assistantId } = req.body
    const longPollingCall = (threadId: string, runnerId: string) => {
      let loonPolling = 10;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
        OpenAIApi.retrieve(threadId, runnerId).then((runner) => {
          if(runner.status == "completed") resolve(runner);
          else if(["queued","in_progress"].includes(runner.status)) {
            loonPolling--;
            if(loonPolling == 0) reject("Long polling timeout");
            else return longPollingCall(threadId, runnerId)
          }
          else if(runner.status == "requires_action") resolve(runner);
          else reject(runner);
        }).catch(reject)
          resolve(loonPolling);
        }, 1000);
      })
    }


    OpenAIApi.createMessage(threadId, text).then((message) => {
      OpenAIApi.runner(threadId,assistantId,instructions).then((runner) => {
        longPollingCall(threadId, runner.id).then((runner) => {
          OpenAIApi.getMessages(threadId).then((messages) => {
            res.status(200).json({ data: messages });
          }).catch((error) => {
            console.log(error);
            res.status(500).json({ error: error });
          })
        }).catch((error) => {
          console.log(error);
          res.status(501).json({ error: error });
        })
      }).catch((error) => {
        console.log(error);
        res.status(502).json({ error: error });
      })
    }).catch((error) => {
      console.log(error);
      res.status(503).json({ error: error });
    })

  }
}