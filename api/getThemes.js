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
    await collection.updateMany(
      {},
      { $rename: {
          'games.$[].ratings.Christian.total': 'games.$[].ratings.Christian.gameplay', 
          'games.$[].ratings.Christian.theme': 'games.$[].ratings.Christian.aging',
          'games.$[].ratings.Rene.total': 'games.$[].ratings.Rene.gameplay', 
          'games.$[].ratings.Rene.theme': 'games.$[].ratings.Rene.aging',
          'games.$[].ratings.Lena.total': 'games.$[].ratings.Lena.gameplay', 
          'games.$[].ratings.Lena.theme': 'games.$[].ratings.Lena.aging'
        }
      }
    )

    // Add 'graphics' and 'trashiness' columns with default values for Christian, Rene, and Lena
    await collection.updateMany(
      {},
      { $set: {
          'games.$[].ratings.Christian.graphics': 'defaultValue', 
          'games.$[].ratings.Christian.trashiness': 'defaultValue',
          'games.$[].ratings.Rene.graphics': 'defaultValue', 
          'games.$[].ratings.Rene.trashiness': 'defaultValue',
          'games.$[].ratings.Lena.graphics': 'defaultValue', 
          'games.$[].ratings.Lena.trashiness': 'defaultValue'
        }
      }
    )
    //
    res.status(200).json(themes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch themes' })
  }
}
