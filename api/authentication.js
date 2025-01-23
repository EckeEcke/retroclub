export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' })
      return
    }
  
    const { password } = req.body
  
    if (!password) {
      res.status(400).json({ error: 'Password is required' })
      return
    }
  
    const passwordLena = process.env.PASSWORD_LENA
    const keyLena = process.env.KEY_LENA
    const passwordRene = process.env.PASSWORD_RENE
    const keyRene = process.env.KEY_RENE
    const passwordChris = process.env.PASSWORD_CHRIS
    const keyChris = process.env.KEY_CHRIS
  
    if (password === passwordLena) {
      res.status(200).json({ key: keyLena })
    } else if (password === passwordRene) {
        res.status(200).json({ key: keyRene })
    } else if (password === passwordChris) {
      res.status(200).json({ key: keyChris })
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  }