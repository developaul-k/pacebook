import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  email?: string
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.body.email && req.body.password) {
    const date = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)

    res.setHeader(
      'Set-Cookie',
      `email=${req.body.email}; path=/; expires=${date.toUTCString()}`
    )
    res.status(200).json({ email: req.body?.email })
  } else {
    res.status(400).json({ error: 'error' })
  }
}
