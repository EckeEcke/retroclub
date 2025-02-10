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

    // Iterate through each document
    for (const theme of themes) {
      if (theme.games && Array.isArray(theme.games)) {
        // Iterate through each game in the games array
        for (const game of theme.games) {
          if (game.ratings) {
            // Iterate through each rater in the ratings object
            for (const rater of Object.keys(game.ratings)) {
              const rating = game.ratings[rater]
              if (rating) {
                // Rename 'total' to 'gameplay' and 'theme' to 'aging'
                if (rating.total !== undefined) {
                  rating.gameplay = rating.total
                  delete rating.total
                }
                if (rating.theme !== undefined) {
                  rating.aging = rating.theme
                  delete rating.theme
                }
                // Add new columns 'graphics' and 'trashiness'
                rating.graphics = 0 // Default value
                rating.trashiness = 0 // Default value
              }
            }
          }
        }
      }
      // Update the document in the collection
      await collection.updateOne(
        { _id: theme._id },
        { $set: { games: theme.games } }
      )
    }
    res.status(200).json(themes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch themes' })
  }
}
