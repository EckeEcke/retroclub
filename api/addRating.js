import { connectToDatabase } from './dbClient'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: ['http://localhost:3000', 'https://your-production-site.com']
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

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { themeName, gameId, key, rating } = req.body

  if (!themeName || !gameId || !key || !rating) {
    res.status(400).json({ error: 'Theme name, game ID, key, and rating are required' })
    return
  }

  let rater

  if (key === process.env.KEY_LENA) {
    rater = 'Lena'
  } else if (key === process.env.KEY_RENE) {
    rater = 'Rene'
  } else if (key === process.env.KEY_CHRIS) {
    rater = 'Chris'
  } else {
    res.status(400).json({ error: 'Invalid key' })
    return
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('themes')

    const theme = await collection.findOne({ name: themeName })

    if (!theme) {
      res.status(404).json({ error: 'Theme not found' })
      return
    }

    const gameIndex = theme.games.findIndex(game => game.id === gameId)

    if (gameIndex === -1) {
      res.status(404).json({ error: 'Game not found' })
      return
    }

    const game = theme.games[gameIndex]

    if (!game.ratings) {
      game.ratings = {}
    }

    game.ratings[rater] = rating

    const updateResult = await collection.updateOne(
      { name: themeName, 'games.id': gameId },
      { $set: { 'games.$.ratings': game.ratings } }
    )

    if (updateResult.modifiedCount === 0) {
      res.status(500).json({ error: 'Failed to update ratings' })
      return
    }

    res.status(200).json({ message: 'Rating updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process request' })
  }
}
