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
    // to be removed
    const cursor = await collection.find({})
    await cursor.forEach(async (document) => {
      if (document.themes && Array.isArray(document.themes)) {
        document.themes.forEach((theme) => {
          if (theme.games && Array.isArray(theme.games)) {
            theme.games.forEach((game) => {
              if (game.ratings) {
                if (game.ratings.Christian) {
                  game.ratings.Christian.gameplay = game.ratings.Christian.total
                  delete game.ratings.Christian.total
                  game.ratings.Christian.aging = game.ratings.Christian.theme
                  delete game.ratings.Christian.theme
                  game.ratings.Christian.graphics = null
                  game.ratings.Christian.trashiness = null
                }
                if (game.ratings.Rene) {
                  game.ratings.Rene.gameplay = game.ratings.Rene.total
                  delete game.ratings.Rene.total
                  game.ratings.Rene.aging = game.ratings.Rene.theme
                  delete game.ratings.Rene.theme
                  game.ratings.Rene.graphics = null
                  game.ratings.Rene.trashiness = null
                }
                if (game.ratings.Lena) {
                  game.ratings.Lena.gameplay = game.ratings.Lena.total
                  delete game.ratings.Lena.total
                  game.ratings.Lena.aging = game.ratings.Lena.theme
                  delete game.ratings.Lena.theme
                  game.ratings.Lena.graphics = null
                  game.ratings.Lena.trashiness = null
                }
              }
            })
          }
        })
      }

      await collection.updateOne(
        { _id: document._id },
        { $set: { themes: document.themes } }
      )
    })
    //
    res.status(200).json(themes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch themes' })
  }
}
