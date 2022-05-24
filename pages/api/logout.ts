import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader(
    'Set-Cookie',
    `email=; path=/; expires=${new Date().toUTCString()}`
  )
  res.status(200).send({})
}
