import { connectToDatabase } from './dbClient'
import Cors from 'cors'

// Initialize the CORS middleware
const cors = Cors({
  methods: ['DELETE', 'OPTIONS'],
  origin: ['http://localhost:3000', 'https://retroclub.vercel.app']
})

// Helper function to run the middleware
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

const validKeys = [process.env.KEY_CHRIS, process.env.KEY_LENA, process.env.KEY_RENE]

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { theme, key } = req.body

  if (!validKeys.includes(key)) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (!theme) {
    res.status(400).json({ error: 'A theme name should be provided' })
    return
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('themes')
    const result = await collection.deleteOne({ name: theme })

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Theme not found' })
      return
    }

    res.status(200).json({ message: 'Theme deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete theme' })
  }
}
