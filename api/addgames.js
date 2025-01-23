import { connectToDatabase } from './dbClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { theme, ids, key } = req.body

  if (key !== process.env.KEY_CHRIS) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (!Array.isArray(ids) || !theme) {
    res.status(400).json({ error: 'A theme name should be added and Ids should be an array' })
    return
  }

  const apiKey = process.env.REACT_APP_GIANT_BOMB_API_KEY

  try {
    const fetch = (await import('node-fetch')).default
    const db = await connectToDatabase()
    const collection = db.collection('themes')
    const existingTheme = await collection.findOne({ name: theme })

    if (existingTheme) {
      const newGames = await Promise.all(ids.map(async (id) => {
        const response = await fetch(`https://www.giantbomb.com/api/game/${id}/?api_key=${apiKey}&format=json`)
        const data = await response.json()
        return data
      }))

      const gamesToAdd = newGames.filter(newGame => !existingTheme.games.some(existingGame => existingGame.id === newGame.id))

      if (gamesToAdd.length > 0) {
        await collection.updateOne(
          { name: theme },
          { $push: { games: { $each: gamesToAdd } } }
        )
      }

      res.status(200).json({ message: 'Data updated successfully', addedGames: gamesToAdd.length })
    } else {
      const games = await Promise.all(ids.map(async (id) => {
        const response = await fetch(`https://www.giantbomb.com/api/game/${id}/?api_key=${apiKey}&format=json`)
        const data = await response.json()
        return data.results
      }))

      const document = {
        name: theme,
        games: games
      }

      await collection.insertOne(document)

      res.status(200).json({ message: 'Data inserted successfully' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch and insert data' })
  }
}
