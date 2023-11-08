// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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
    return "TEST"
  }

}



