// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import OpenAIApi from "../../services/gpt";
import { resolve } from "path";
import { longPollingCall, longPollingCallList } from "@/utils/loongPollings";

type Data = {
  data?: any;
  error?: string;
};

export default function handler(
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
    const { threadId, text, instructions, assistantId } = req.body;

    OpenAIApi.createMessage(threadId, text)
      .then((message) => {
        OpenAIApi.runner(threadId, assistantId, instructions)
          .then((runner) => {
            longPollingCall(threadId, runner.id)
              .then((runner) => {
                longPollingCallList(threadId)
                  .then(() => {
                    OpenAIApi.getMessages(threadId)
                      .then((messages) => {
                        res.status(200).json({ data: messages });
                      })
                      .catch((error) => {
                        console.log(error);
                        res.status(504).json({ error: error });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(500).json({ error: error });
                  });
              })
              .catch((error) => {
                console.log(error);
                res.status(501).json({ error: error });
              });
          })
          .catch((error) => {
            console.log(error);
            res.status(502).json({ error: error });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(503).json({ error: error });
      });
  }
}
