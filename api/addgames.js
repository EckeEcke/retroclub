import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { ids } = req.body

  if (!Array.isArray(ids)) {
    res.status(400).json({ error: 'Ids should be an array' })
    return
  }

  const apiKey = process.env.GIANT_BOMB_API_KEY

  try {
    const results = await Promise.all(ids.map(async (id) => {
      const response = await fetch(`https://www.giantbomb.com/api/game/${id}/?api_key=${apiKey}&format=json`)
      const data = await response.json()
      return data
    }))

    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}