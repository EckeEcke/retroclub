import { connectToDatabase } from './dbClient'
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'OPTIONS'],
  origin: ['http://localhost:3000', 'https://your-production-site.com']
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('themes')
    const themes = await collection.find({}).toArray()

    await collection.updateMany(
      {}, // Match all documents
      { $unset: { themes: "" } } // Remove the `themes` field
    )
    res.status(200).json(themes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch themes' })
  }
}
